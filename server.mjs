import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { extname, normalize, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = resolve(fileURLToPath(new URL('.', import.meta.url)));
const host = process.env.HOST ?? '127.0.0.1';
const port = Number(process.env.PORT ?? 5173);
const mime = { '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.svg': 'image/svg+xml', '.png': 'image/png', '.webp': 'image/webp', '.ico': 'image/x-icon', '.woff2': 'font/woff2' };
const fontCache = new Map();
const fontFamilies = new Set(['DM+Sans', 'Fredoka']);
const publicFiles = new Set(['index.html', 'app.js', 'game-logic.js', 'styles.css']);
const speechCache = new Map();
const speechInFlight = new Map();
const MAX_CACHE_SIZE = 80;
const ELEVENLABS_RATE_LIMIT_MS = Number(process.env.ELEVENLABS_RATE_LIMIT_MS ?? '2200');
const ELEVENLABS_RATE_LIMIT_MEMORY_MS = Number(process.env.ELEVENLABS_RATE_LIMIT_MEMORY_MS ?? '120000');
const rateLimiter = { last: 0, count: 0, max: ELEVENLABS_RATE_LIMIT_MEMORY_MS, clear() { this.last = 0; this.count = 0; } };

try {
  const env = await readFile(resolve(root, '.env'), 'utf8');
  for (const line of env.split(/\r?\n/)) {
    const match = line.match(/^\s*(?:export\s+)?([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.*?)\s*$/);
    if (!match || process.env[match[1]] !== undefined) continue;
    const value = match[2].replace(/\s+#.*$/, '');
    process.env[match[1]] = (value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'")) ? value.slice(1, -1) : value;
  }
} catch (error) {
  if (error.code !== 'ENOENT') throw error;
}

function send(res, status, contentType, body, extraHeaders = {}) {
  res.writeHead(status, { 'content-type': contentType, 'x-content-type-options': 'nosniff', ...extraHeaders });
  res.end(body);
}

export async function speechHandler(req, res) {
  if (req.method !== 'POST') return send(res, 405, 'application/json', JSON.stringify({ error: 'Method not allowed' }), { allow: 'POST' });
  const key = process.env.ELEVENLABS_API_KEY;
  const voice = process.env.ELEVENLABS_VOICE_ID;
  if (!key || !voice) return send(res, 503, 'application/json', JSON.stringify({ error: 'Voice service is not configured' }), { 'cache-control': 'no-store' });

  let raw = '';
  for await (const chunk of req) {
    raw += chunk;
    if (raw.length > 2048) return send(res, 413, 'application/json', JSON.stringify({ error: 'Phrase is too long' }), { 'cache-control': 'no-store' });
  }
  let text;
  try { text = String(JSON.parse(raw).text ?? '').trim(); } catch { return send(res, 400, 'application/json', JSON.stringify({ error: 'Invalid request' }), { 'cache-control': 'no-store' }); }
  if (!text || text.length > 160) return send(res, 400, 'application/json', JSON.stringify({ error: 'Invalid phrase' }), { 'cache-control': 'no-store' });

  const cacheKey = `${voice}:${text}`;
  if (speechCache.has(cacheKey)) {
    const now = Date.now();
    if (now - (rateLimiter.last || 0) > ELEVENLABS_RATE_LIMIT_MEMORY_MS) rateLimiter.count = 0;
    rateLimiter.last = now;
    rateLimiter.count += 1;
    return send(res, 200, 'audio/mpeg', speechCache.get(cacheKey), { 'cache-control': 'private, max-age=86400' });
  }

  if (rateLimiter.count > Math.floor(ELEVENLABS_RATE_LIMIT_MS / 2500)) return send(res, 503, 'application/json', JSON.stringify({ error: 'Swedish voice is temporarily busy' }), { 'cache-control': 'no-store', 'retry-after': `${Math.ceil(rateLimiter.count / (ELEVENLABS_RATE_LIMIT_MS / 1000))}` });

  let request = speechInFlight.get(cacheKey);
  if (!request) {
    request = fetch(`https://api.elevenlabs.io/v1/text-to-speech/${encodeURIComponent(voice)}?output_format=mp3_44100_128`, {
      method: 'POST',
      headers: { 'xi-api-key': key, 'content-type': 'application/json', accept: 'audio/mpeg' },
      body: JSON.stringify({ text, model_id: 'eleven_multilingual_v2', language_code: 'sv', voice_settings: { stability: 0.58, similarity_boost: 0.72, style: 0.18, use_speaker_boost: true } }),
      signal: AbortSignal.timeout(18000),
    }).then(async (response) => {
      if (!response.ok) throw new Error(`Voice provider returned ${response.status}`);
      const audio = Buffer.from(await response.arrayBuffer());
      if (!audio.length || audio.length > 5_000_000) throw new Error('Voice response was invalid');
      if (speechCache.size >= MAX_CACHE_SIZE) speechCache.delete(speechCache.keys().next().value);
      speechCache.set(cacheKey, audio);
      return audio;
    }).finally(() => speechInFlight.delete(cacheKey));
    speechInFlight.set(cacheKey, request);
  }
  try {
    const audio = await request;
    send(res, 200, 'audio/mpeg', audio, { 'cache-control': 'private, max-age=86400' });
  } catch (error) {
    console.warn('Swedish voice is temporarily unavailable:', error.message);
    send(res, 502, 'application/json', JSON.stringify({ error: 'Swedish voice is temporarily unavailable' }), { 'cache-control': 'no-store' });
  }
}

export async function serveFont(family, res) {
  const expected = family === 'DM Sans' ? 'DM+Sans' : family;
  if (!fontFamilies.has(expected)) return send(res, 404, 'text/plain; charset=utf-8', 'Font not found');
  try {
    let pending = fontCache.get(family);
    if (!pending) {
      pending = (async () => {
        const stylesUrl = new URL(`https://fonts.googleapis.com/css2?family=${encodeURIComponent(family).replaceAll('%20', '+')}:wght@400;500;600;700&display=swap`);
        const response = await fetch(stylesUrl, { headers: { 'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 13_6) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.4 Safari/605.1.15' }, signal: AbortSignal.timeout(8500) });
        if (!response.ok) throw new Error(`Font stylesheet unavailable (${response.status})`);
        const css = await response.text();
        const urls = [...css.matchAll(/url\((https:\/\/[^)]+\.woff2)\)/g)].map((match) => match[1]);
        const assetUrl = urls.find((url) => url.includes('latin')) ?? urls.at(-1);
        if (!assetUrl) throw new Error('Font stylesheet did not include an installable font');
        const fileResponse = await fetch(assetUrl, { signal: AbortSignal.timeout(8500) });
        if (!fileResponse.ok) throw new Error(`Font asset unavailable (${fileResponse.status})`);
        const file = Buffer.from(await fileResponse.arrayBuffer());
        if (!file.length || file.length > 600_000) throw new Error('Font asset is invalid');
        return file;
      })().catch((error) => { fontCache.delete(family); throw error; });
      fontCache.set(family, pending);
    }
    const file = await pending;
    return send(res, 200, 'font/woff2', file, { 'cache-control': 'public, max-age=2592000, immutable', 'access-control-allow-origin': '*' });
  } catch (error) {
    console.warn('Optional locally served display font unavailable:', error.message);
    return send(res, 404, 'text/plain; charset=utf-8', 'Font unavailable');
  }
}

export async function handleRequest(req, res) {
  res.setHeader('referrer-policy', 'same-origin');
  res.setHeader('x-frame-options', 'DENY');
  const requestUrl = new URL(req.url ?? '/', 'http://localhost');
  if (requestUrl.pathname === '/api/speech') return void await speechHandler(req, res);
  const fontMatch = requestUrl.pathname.match(/^\/fonts\/(DM\+Sans|Fredoka)\.woff2$/);
  if (fontMatch && req.method === 'GET') return void await serveFont(fontMatch[1].replace('+', ' '), res);
  if (req.method !== 'GET' && req.method !== 'HEAD') return send(res, 405, 'text/plain; charset=utf-8', 'Method not allowed', { allow: 'GET, HEAD' });

  let pathname;
  try { pathname = decodeURIComponent(requestUrl.pathname); }
  catch { return send(res, 400, 'text/plain; charset=utf-8', 'Invalid path'); }
  const relative = normalize(pathname === '/' ? 'index.html' : pathname.replace(/^\/+/, ''));
  const path = resolve(root, relative);
  if (path !== root && !path.startsWith(`${root}/`)) return send(res, 403, 'text/plain; charset=utf-8', 'Forbidden');
  if (pathname === '/' || pathname === '/index.html' || publicFiles.has(pathname.slice(1))) {
    try {
      const publicPath = pathname === '/' ? resolve(root, 'index.html') : path;
      const info = await stat(publicPath);
      if (!info.isFile()) throw new Error('Not a file');
      const body = await readFile(publicPath);
      res.writeHead(200, { 'content-type': mime[extname(publicPath)] ?? 'application/octet-stream', 'content-length': body.length, 'cache-control': extname(publicPath) === '.html' ? 'no-cache' : 'public, max-age=3600' });
      if (req.method === 'HEAD') return res.end();
      return res.end(body);
    } catch { return send(res, 404, 'text/plain; charset=utf-8', 'Not found'); }
  }
  return send(res, 404, 'text/plain; charset=utf-8', 'Not found');
}

if (process.argv[1] && import.meta.url === pathToFileURL(resolve(process.argv[1])).href) {
  createServer((req, res) => void handleRequest(req, res)).listen(port, host, () => console.log(`Elias’ Swedish adventure is ready at http://${host}:${port}`));
}
