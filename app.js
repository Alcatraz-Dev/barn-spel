import { chooseNextColor, createPuzzleState, placePuzzlePiece as placePuzzlePieceLogic } from './game-logic.js';

const animalWords = [
  { id: 'cow', word: 'En ko', sound: 'Mu!', art: `<ellipse cx="94" cy="116" rx="56" ry="39" fill="#fffaf0"/><path d="M45 86q-18-10-27-4l-10 16q11 13 26 12m116-25q15-12 29-3l6 14-19 11" fill="#a78d78" stroke="#796955" stroke-width="4" stroke-linejoin="round"/><path d="M54 113q16-19 29-5t-5 21q-17 9-24-5zm63-18q13-18 27-8 13 13 1 24-16 8-27-3z" fill="#7d7066"/><path d="m63 148 2 20m57-20 3 20m-32-20v20m20-18v18" stroke="#877663" stroke-width="8" stroke-linecap="round"/><path d="M40 80 37 68l13 10m77-7-3 12 15-7" fill="#fff3db" stroke="#8f7b66" stroke-width="3" stroke-linejoin="round"/><circle cx="51" cy="102" r="3" fill="#453b32"/><ellipse cx="178" cy="110" rx="12" ry="10" fill="#f2a694"/></>` },
  { id: 'dog', word: 'En hund', sound: 'Voff!', art: `<path d="M57 77q-33-38-41-4-6 38 30 43zm74-2q27-37 41-9 12 26-18 48z" fill="#b9885d" stroke="#825d42" stroke-width="4"/><ellipse cx="99" cy="116" rx="51" ry="50" fill="#e6bb83"/><path d="M72 130q26-17 53 0 14 17 0 33-24 20-51 0-12-17-2-33" fill="#fff4df"/><ellipse cx="82" cy="109" rx="4" ry="6" fill="#423b34"/><ellipse cx="118" cy="109" rx="4" ry="6" fill="#423b34"/><ellipse cx="101" cy="129" rx="10" ry="7" fill="#573d37"/><path d="M101 135q-8 11-16 3m16-3q9 11 16 3" fill="none" stroke="#85504a" stroke-width="3" stroke-linecap="round"/><path d="m58 156-3 13m82-13 4 13" stroke="#ba9066" stroke-width="9" stroke-linecap="round"/><path d="M144 128q24-4 23 14t-17 6" fill="none" stroke="#b9885d" stroke-width="8" stroke-linecap="round"/></>` },
  { id: 'cat', word: 'En katt', sound: 'Mjau!', art: `<path d="M48 107 40 41l48 39q12-4 24 0l47-38-8 67" fill="#d5b8a4" stroke="#967a69" stroke-width="4" stroke-linejoin="round"/><path d="m53 69-3-19 24 18m55 0 21-18-3 20" fill="#e9978c"/><ellipse cx="103" cy="118" rx="59" ry="46" fill="#dfc9b5"/><ellipse cx="82" cy="111" rx="10" ry="13" fill="#acd0a0"/><ellipse cx="125" cy="111" rx="10" ry="13" fill="#acd0a0"/><ellipse cx="82" cy="112" rx="3.5" ry="8" fill="#413930"/><ellipse cx="125" cy="112" rx="3.5" ry="8" fill="#413930"/><path d="m96 131 8-6 9 6q-4 9-9 9-6 0-8-9" fill="#d98479"/><path d="M103 139q-9 12-17 4m17-4q9 12 17 4M49 129l-25-5m25 12-26 5m121-12 24-5m-23 12 25 4" fill="none" stroke="#816e60" stroke-width="2.5" stroke-linecap="round"/><path d="M73 152q-3 16 13 17m47-17q4 16-13 17" fill="none" stroke="#f1c2ac" stroke-width="5" stroke-linecap="round"/></>` },
  { id: 'sheep', word: 'Ett får', sound: 'Bä!', art: `<path d="M54 105q-19-15-8-35 9-18 31-10 5-28 32-24 20 3 21 23 24-15 38 5 11 18-5 37 9 19-8 33-18 16-38 5-19 11-34-4-14-14-5-33z" fill="#fffaf1" stroke="#d7cfbd" stroke-width="4"/><path d="M93 82q19-12 37 2 14 15 8 40-6 19-24 22-21-2-28-23-4-23 7-41" fill="#d5b5a6"/><path d="M87 91q-22-23-35-8-14 14 2 30l18 3m69-24q18-23 33-8 13 14-2 30l-17 4" fill="#e0c6b7" stroke="#c4a18e" stroke-width="3"/><ellipse cx="104" cy="105" rx="4" ry="6" fill="#473c38"/><ellipse cx="125" cy="105" rx="4" ry="6" fill="#473c38"/><path d="M108 121q8 6 15 0" fill="none" stroke="#765952" stroke-width="3" stroke-linecap="round"/><ellipse cx="96" cy="115" rx="5" ry="3" fill="#edaaa0"/><ellipse cx="136" cy="115" rx="5" ry="3" fill="#edaaa0"/><path d="m103 140-1 20m28-20 2 20" stroke="#967861" stroke-width="7" stroke-linecap="round"/></>` },
  { id: 'horse', word: 'En häst', sound: 'Gnäää!', art: `<path d="M74 161q-14-29 0-58 14-29 49-22l21 14q15 25-1 55l-9 21H77z" fill="#ac805e"/><path d="M79 101q-14-21-6-41 10-25 36-24 17 1 27 19l-3 37q-18 18-43 12z" fill="#ba8a64" stroke="#87634b" stroke-width="4"/><path d="M72 57q-14-13-12-27 17 5 25 18m44-2q4-17 15-22 4 16-1 30" fill="#a97954" stroke="#805c44" stroke-width="3" stroke-linejoin="round"/><path d="M83 60q-2-18 1-25l7 17m32-4 9-19 2 28" fill="#78584a"/><path d="M103 46q-8 24 12 43l12-5-5-19 8-22" fill="#725244"/><circle cx="91" cy="70" r="3.7" fill="#423932"/><path d="m112 93 13 4" stroke="#7b5545" stroke-width="3" stroke-linecap="round"/><path d="M77 126q-21 16-14 36t24 5" fill="none" stroke="#825b45" stroke-width="9" stroke-linecap="round"/><path d="m88 154-2 15m47-15 3 15" stroke="#967356" stroke-width="8" stroke-linecap="round"/><path d="M78 109q12 6 20 1" stroke="#845c46" stroke-width="3" fill="none"/></>` },
  { id: 'duck', word: 'En anka', sound: 'Kvack!', art: `<path d="M45 127q6-43 46-46 39-5 55 24 12 22-3 44-18 19-50 13-30-6-48-35" fill="#f2d162"/><path d="M83 112q15-15 33 1-7 21-26 21-11-9-7-22z" fill="#ffefc5"/><path d="M107 85q-5-28 8-44 15-18 38-7 19 9 13 34-5 26-31 31" fill="#ffe188" stroke="#d7ad55" stroke-width="4"/><path d="M160 83q29-5 37 5-8 14-32 12" fill="#ef9479" stroke="#c86e59" stroke-width="3"/><circle cx="145" cy="62" r="4" fill="#443a32"/><path d="m77 150-6 15m48-13 2 14" stroke="#d5924d" stroke-width="6" stroke-linecap="round"/><path d="M56 118q-19 8-20 26" stroke="#d5ad51" stroke-width="4" fill="none" stroke-linecap="round"/><path d="M110 38q14-18 30-13" fill="none" stroke="#fff1c8" stroke-width="3" stroke-linecap="round"/></>` },
];

const colorWords = [
  { id: 'red', word: 'Röd', object: 'äpplet', color: '#de796b', tint: '#fde7df', label: 'äpple' },
  { id: 'blue', word: 'Blå', object: 'fjärilen', color: '#75a8da', tint: '#e3f0f9', label: 'fjäril' },
  { id: 'yellow', word: 'Gul', object: 'solen', color: '#edc14e', tint: '#fbf2d8', label: 'sol' },
  { id: 'green', word: 'Grön', object: 'bladet', color: '#81aa70', tint: '#e9f1df', label: 'blad' },
  { id: 'orange', word: 'Orange', object: 'moroten', color: '#e99554', tint: '#fbecdf', label: 'morot' },
  { id: 'purple', word: 'Lila', object: 'blomman', color: '#a28bc8', tint: '#eee9f6', label: 'blomma' },
];

const artSvg = (kind, color, label) => {
  const common = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 72 68" fill="none"><ellipse cx="36" cy="61" rx="19" ry="3" fill="#6e674b" opacity=".10"/>`;
  let shapes;
  switch (kind) {
    case 'apple':
      shapes = `<path d="M36 20c-11-10-21-4-24 8-4 15 5 30 19 29 2-4 9-4 12 0 13-1 20-15 17-29-2-12-14-18-24-8Z" fill="${color}"/><path d="M34 22q0-12 8-17" stroke="#896547" stroke-width="3" stroke-linecap="round"/><path d="M40 14q14-11 18 2-10 8-19 2" fill="#91b37d"/><path d="M23 31q-1 9 4 15" stroke="#fff" stroke-opacity=".42" stroke-width="3" stroke-linecap="round"/>`;
      break;
    case 'butterfly':
      shapes = `<path d="M36 35Q25 8 14 12 0 17 13 34 0 43 14 51q14 6 22-13 8 19 22 13 14-8 1-17Q72 17 58 12 47 8 36 35Z" fill="${color}"/><path d="M36 25q-1 16 1 29" stroke="#655748" stroke-width="3" stroke-linecap="round"/><path d="M36 26q-1-9-7-11m8 11q5-9 11-10" stroke="#82625a" stroke-width="2" stroke-linecap="round"/><circle cx="18" cy="28" r="3" fill="#fff" opacity=".8"/><circle cx="55" cy="28" r="3" fill="#fff" opacity=".8"/><circle cx="21" cy="43" r="2.6" fill="#fff" opacity=".8"/><circle cx="52" cy="44" r="2.6" fill="#fff" opacity=".8"/>`;
      break;
    case 'sun':
      shapes = `<circle cx="36" cy="34" r="16" fill="${color}"/><path d="M36 7v8m0 38v8M9 34h9m36 0h9M17 15l6 6m26 26 6 6m0-38-6 6M23 47l-6 6" stroke="${color}" stroke-width="4" stroke-linecap="round"/><circle cx="30" cy="33" r="1.8" fill="#65513a"/><circle cx="42" cy="33" r="1.8" fill="#65513a"/><path d="M31 39q5 5 10 0" stroke="#8a6340" stroke-width="2" stroke-linecap="round"/>`;
      break;
    case 'leaf':
      shapes = `<path d="M59 13Q30 11 18 28 5 49 17 56q18 12 35-8Q62 36 59 13Z" fill="${color}"/><path d="M14 57q16-21 36-31m-28 22-5-14m15 3-2-11m-5 34 3-12m-6-1-11 1" stroke="#fff" stroke-opacity=".7" stroke-width="2.2" stroke-linecap="round"/><path d="M45 18q-15 3-22 12" stroke="#fff" stroke-opacity=".6" stroke-width="2" stroke-linecap="round"/>`;
      break;
    case 'carrot':
      shapes = `<path d="M21 26Q28 20 52 24q6 2 2 9L33 56q-5 6-8-1l-9-22q-3-6 5-7Z" fill="${color}"/><path d="M31 25q-5-12 2-19 9 5 6 16m4 2q2-14 14-15 4 12-7 19m-15-7Q23 6 13 12q1 13 18 17" fill="#83a879"/><path d="m22 33 14 4m-8 5 9 3m-5-16 8 3" stroke="#ffd4a0" stroke-width="2" stroke-linecap="round"/>`;
      break;
    default:
      shapes = `<path d="M36 25q-2-15-15-12-12 6 1 17-13-5-17 6-1 12 17 10-10 8-1 17 11 4 16-11 4 15 16 11 8-8-2-17 18 3 18-9-4-13-17-7 12-12-1-17-11-3-15 12Z" fill="${color}"/><circle cx="36" cy="39" r="10" fill="#f9df85" stroke="#fff9e9" stroke-width="3"/><path d="m36 48 1 12m0 0-8 5m8-5 8 5" stroke="#82a678" stroke-width="3" stroke-linecap="round"/><circle cx="33" cy="37" r="1.2" fill="#695542"/><circle cx="39" cy="37" r="1.2" fill="#695542"/>`;
  }
  return `${common}${shapes}</svg>`;
};
const colorKindMap = { red: 'apple', blue: 'butterfly', yellow: 'sun', green: 'leaf', orange: 'carrot', purple: 'flower' };
const colorArt = Object.fromEntries(colorWords.map(({ id, color, label }) => [id, `data:image/svg+xml,${encodeURIComponent(artSvg(colorKindMap[id], color, label))}`]));

const compliments = ['Bra jobbat, Elias!', 'Vad duktig du är!', 'Du hittade rätt!', 'Heja dig, Elias!', 'Vilken fin upptäckare du är!'];
const puzzleScene = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 320"><rect width="400" height="320" rx="26" fill="#dceee2"/><circle cx="329" cy="55" r="27" fill="#ffe181"/><g fill="#fffdf3" opacity=".84"><ellipse cx="64" cy="76" rx="39" ry="12"/><ellipse cx="84" cy="68" rx="25" ry="18"/><ellipse cx="103" cy="77" rx="27" ry="11"/></g><path d="M0 210q89-52 175-4 97 42 225-12v126H0Z" fill="#bdd6a2"/><path d="M0 258q102-71 204-15t196-22v99H0Z" fill="#95c085"/><path d="M88 233q-5-91 105-104 72 0 101 69 23 57-38 85-69 30-133-3-33-17-35-47Z" fill="#f1d565" stroke="#dbb848" stroke-width="7"/><path d="M128 169q50-27 96 5 30 29 13 62-24 28-64 22-50-8-55-49-1-22 10-40Z" fill="#fff0c3"/><path d="M205 146q-10-55 24-79 33-21 63 6 24 26 10 61-12 32-51 40" fill="#f9df78" stroke="#dbb848" stroke-width="6"/><path d="M289 129q45-3 52 16-13 17-49 12" fill="#ed9880" stroke="#c97860" stroke-width="5"/><ellipse cx="271" cy="111" rx="5" ry="7" fill="#483d34"/><path d="M101 254q-26 8-36 34 3 13 20 12l52-16m96 16q36-26 68-22" fill="none" stroke="#e6cb61" stroke-width="10" stroke-linecap="round"/><g fill="#fffaee"><circle cx="44" cy="243" r="5"/><circle cx="60" cy="283" r="4"/><circle cx="361" cy="251" r="6"/></g><g fill="#ed9e8d"><circle cx="45" cy="242" r="2"/><circle cx="360" cy="249" r="2"/></g></svg>`;
const puzzleSceneUri = `data:image/svg+xml,${encodeURIComponent(puzzleScene)}`;

const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
const state = {
  screen: 'home', world: 'animals', soundEnabled: true, forceNative: false, activeUtterance: null, activeAudio: null, request: null,
  revealed: null, challengeTarget: null, correctAnimals: new Set(), round: 0, correctCount: 0, colorsRound: 0, colorTarget: null,
  colorOrder: [], colorCorrect: 0, puzzleSelected: null, puzzlePointer: null, puzzleGhost: null, puzzlePieces: [], puzzleSlots: [null, null, null, null], puzzleCompleted: false,
  complimentIndex: 0, feedbackTimeout: null, toastTimeout: null, gameSequence: 0, lastColorId: null,
};

function readProgress() {
  try {
    const data = JSON.parse(localStorage.getItem('elias-angslandet-progress') || '{}');
    return { stars: Math.max(0, Math.min(999, Number(data.stars) || 0)), completed: [...new Set(Array.isArray(data.completed) ? data.completed.filter((world) => ['animals', 'colors', 'puzzle'].includes(world)) : [])] };
  } catch { return { stars: 0, completed: [] }; }
}
let progress = readProgress();
function saveProgress() {
  try { localStorage.setItem('elias-angslandet-progress', JSON.stringify(progress)); } catch { /* Game remains usable when browser storage is unavailable. */ }
  updateProgressUI();
}
function updateProgressUI() {
  ['#star-count', '#game-star-count'].forEach((selector) => { const target = $(selector); if (target) target.textContent = String(progress.stars); });
  $('#footer-stars').textContent = String(progress.stars);
  $('#home-progress').textContent = progress.completed.length ? `${progress.completed.length} AV 3 SMÅ VÄRLDAR BESÖKTA` : 'BÖRJA NÄR DU VILL';
  $('#journey-label').innerHTML = progress.completed.length === 3 ? 'Alla tre världar besökta <span aria-hidden="true">✦</span>' : progress.completed.length ? `${progress.completed.length} av 3 världar besökta <span aria-hidden="true">↗</span>` : 'Börja var du vill <span aria-hidden="true">↗</span>';
}

function nativeSwedishVoice() {
  if (!('speechSynthesis' in window)) return null;
  const voices = speechSynthesis.getVoices();
  return voices.find(({ lang }) => /^sv[-_]SE$/i.test(lang))
    || voices.find(({ lang, name }) => /^sv(?:[-_]|$)/i.test(lang) || /swedish|svenska/i.test(name))
    || null;
}
function stopCurrentAudio() {
  if (state.request) { state.request.abort(); state.request = null; }
  if (state.activeAudio) { const old = state.activeAudio; state.activeAudio = null; old.pause(); old.src = ''; }
  if ('speechSynthesis' in window) speechSynthesis.cancel();
  state.activeUtterance = null;
}
function updateVoiceStatus(message) {
  const target = $('#voice-status');
  if (target) target.textContent = message;
}
async function speak(text) {
  if (!state.soundEnabled || !text) return false;
  stopCurrentAudio();
  const sequence = state.gameSequence;
  const nativeVoice = nativeSwedishVoice();
  if (!state.forceNative && window.fetch && window.Audio) {
    const controller = new AbortController();
    state.request = controller;
    try {
      const response = await fetch('/api/speech', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ text }), signal: controller.signal });
      if (!response.ok) throw new Error(`Voice unavailable (${response.status})`);
      const blob = await response.blob();
      if (!blob.size || (sequence !== state.gameSequence && state.screen !== 'home')) return false;
      const audio = new Audio(URL.createObjectURL(blob));
      state.activeAudio = audio;
      audio.addEventListener('ended', () => { if (state.activeAudio === audio) { URL.revokeObjectURL(audio.src); state.activeAudio = null; } }, { once: true });
      await audio.play();
      state.request = null;
      updateVoiceStatus('Tydligt svenskt tal klart att lyssna på.');
      return true;
    } catch (error) {
      if (error.name === 'AbortError') return false;
      if (state.request === controller) state.request = null;
      updateVoiceStatus(nativeVoice ? `ElevenLabs är inte tillgängligt just nu. Använder svensk röst (${nativeVoice.lang}).` : 'ElevenLabs är inte tillgängligt just nu. Försöker hitta en svensk röst.');
    }
  }
  if (!('speechSynthesis' in window)) {
    updateVoiceStatus('Ingen svensk uppläsningsröst hittades. Alla spel går att spela ändå.');
    return false;
  }
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = nativeVoice?.lang || 'sv-SE';
  if (nativeVoice) utterance.voice = nativeVoice;
  utterance.rate = 0.86;
  utterance.pitch = 1.04;
  utterance.volume = .85;
  state.activeUtterance = utterance;
  utterance.onend = () => { if (state.activeUtterance === utterance) state.activeUtterance = null; };
  utterance.onerror = () => {
    if (state.activeUtterance === utterance) state.activeUtterance = null;
    updateVoiceStatus('Den svenska rösten kunde inte spela just nu. Vi kan leka vidare ändå.');
  };
  try {
    speechSynthesis.speak(utterance);
    updateVoiceStatus(nativeVoice ? `Använder en svensk röst (${nativeVoice.lang}).` : 'Använder webbläsarens tillgängliga röst. Kontrollera att svenska röster finns på enheten.');
    return true;
  } catch {
    updateVoiceStatus('Den svenska rösten kunde inte spela just nu. Vi kan leka vidare ändå.');
    return false;
  }
}
function setSoundEnabled(value) {
  state.soundEnabled = value;
  const button = $('.sound-toggle');
  button.setAttribute('aria-pressed', String(!value));
  button.setAttribute('aria-label', value ? 'Ljud på, tryck för att stänga av' : 'Ljud av, tryck för att sätta på');
  button.title = value ? 'Stäng av ljudet' : 'Sätt på ljudet';
  $('use', button).setAttribute('href', value ? '#icon-sound' : '#icon-muted');
  button.classList.toggle('is-muted', !value);
  if (!value) stopCurrentAudio();
}
function chime(kind = 'correct') {
  if (!state.soundEnabled || !window.AudioContext && !window.webkitAudioContext) return;
  try {
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    const context = new AudioCtx();
    const notes = kind === 'correct' ? [659, 880] : [440];
    notes.forEach((frequency, index) => {
      const oscillator = context.createOscillator();
      const gain = context.createGain();
      oscillator.type = 'sine';
      oscillator.frequency.value = frequency;
      gain.gain.setValueAtTime(.0001, context.currentTime + index * .095);
      gain.gain.exponentialRampToValueAtTime(.052, context.currentTime + index * .095 + .024);
      gain.gain.exponentialRampToValueAtTime(.0001, context.currentTime + index * .095 + .22);
      oscillator.connect(gain);
      gain.connect(context.destination);
      oscillator.start(context.currentTime + index * .095);
      oscillator.stop(context.currentTime + index * .095 + .235);
    });
    setTimeout(() => { context.close().catch(() => {}); }, 550);
  } catch { /* Optional sound effects never interrupt play. */ }
}
function setScreen(screen) {
  stopCurrentAudio();
  state.gameSequence++;
  if (state.feedbackTimeout) clearTimeout(state.feedbackTimeout);
  state.screen = screen;
  $('#home-screen').hidden = screen !== 'home';
  $('#game-screen').hidden = screen !== 'game';
  if (screen === 'home') {
    document.title = 'Elias & Ängslandet — Små ord, stora äventyr';
    history.replaceState(null, '', '#hem');
  } else {
    history.replaceState(null, '', `#${screen === 'game' ? state.world : 'hem'}`);
    document.title = `${worldTitles[state.world]} — Elias & Ängslandet`;
  }
  window.scrollTo({ top: 0, behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' });
  updateProgressUI();
}
const worldTitles = { animals: 'Djurens värld', colors: 'Färgernas värld', puzzle: 'Pusselvärlden' };
function openWorld(world) {
  if (!worldTitles[world]) return;
  state.world = world;
  progress = { ...progress, completed: [...new Set([...progress.completed, world])] };
  saveProgress();
  $('#game-world-label').innerHTML = `<span class="game-label-dot"></span> ${world === 'animals' ? 'DJURENS VÄRLD' : world === 'colors' ? 'FÄRGERNAS VÄRLD' : 'PUSSELVÄRLDEN'}`;
  $('#game-screen').dataset.world = world;
  $('#challenge-count').textContent = '';
  $('#feedback-banner').hidden = true;
  $('#celebration-layer').replaceChildren();
  setScreen('game');
  if (world === 'animals') initAnimals();
  if (world === 'colors') initColors();
  if (world === 'puzzle') initPuzzle();
}
function addStar(world) {
  const key = `elias-angslandet-activity-${world}`;
  let rewarded = false;
  try { rewarded = localStorage.getItem(key) === '1'; } catch { rewarded = progress.completed.includes(world) && false; }
  if (rewarded) return false;
  try { localStorage.setItem(key, '1'); } catch { /* Current session still receives its reward. */ }
  progress = { ...progress, stars: Math.min(999, progress.stars + 1) };
  saveProgress();
  return true;
}
function renderActivity(html) {
  $('#activity-content').innerHTML = html;
}
function showFeedback(message, good = true, duration = 1550) {
  const banner = $('#feedback-banner');
  banner.textContent = message;
  banner.classList.toggle('wrong-feedback', !good);
  banner.hidden = false;
  if (state.feedbackTimeout) clearTimeout(state.feedbackTimeout);
  state.feedbackTimeout = setTimeout(() => { banner.hidden = true; }, duration);
}
function celebrate() {
  const layer = $('#celebration-layer');
  const rect = $('#game-stage').getBoundingClientRect();
  const styles = getComputedStyle(document.documentElement);
  const colors = ['#e9b949', '#e78873', '#a4bf8f', '#a695c6', '#fff8e5'];
  for (let index = 0; index < 9; index++) {
    const star = document.createElement('span');
    star.className = 'celebration-star';
    star.textContent = '✦';
    star.style.left = `${Math.max(5, Math.min(94, 21 + Math.random() * 58))}%`;
    star.style.top = `${Math.max(12, Math.min(79, 19 + Math.random() * 34))}%`;
    star.style.color = colors[index % colors.length];
    star.style.fontSize = `${15 + Math.random() * 12}px`;
    star.style.animationDelay = `${Math.random() * .15}s`;
    layer.appendChild(star);
    setTimeout(() => star.remove(), 1150);
  }
  const fox = $('.stage-fox');
  if (fox) {
    fox.animate([{ transform: 'translateY(0) rotate(0)' }, { transform: 'translateY(-11px) rotate(-9deg)' }, { transform: 'translateY(0) rotate(0)' }], { duration: 470, easing: 'ease-out' });
  }
  void rect;
}
function nextCompliment() {
  const result = compliments[state.complimentIndex % compliments.length];
  state.complimentIndex++;
  return result;
}
function announceCorrect(message = nextCompliment()) {
  chime('correct');
  showFeedback(message, true);
  celebrate();
  speak(message);
}
function announceRetry() {
  const retry = 'Nästan! Försök igen, du kan!';
  chime('retry');
  showFeedback('Nästan! Prova igen, Elias!', false, 1350);
  speak(retry);
}

function animalMarkup(animal) {
  return `<svg class="animal-artwork" viewBox="0 0 200 180" role="img" aria-label="${animal.word}"><title>${animal.word}</title>${animal.art}</svg>`;
}
function initAnimals() {
  state.revealed = null;
  state.challengeTarget = null;
  state.correctAnimals = new Set();
  state.round = 0;
  state.correctCount = 0;
  $('#game-title').textContent = 'Hej, djurkompisar!';
  $('#game-eyebrow').textContent = 'ETT LITET ÄVENTYR';
  $('#game-subtitle').textContent = 'Tryck på en kompis och säg hej.';
  $('#replay-prompt').setAttribute('aria-label', 'Lyssna på hälsningen igen');
  const allAnimalCards = animalWords.map((animal) => `<button class="animal-spot" type="button" data-animal="${animal.id}" aria-label="Tryck för att höra: ${animal.word}">${animalMarkup(animal)}<span class="animal-spot-name">${animal.word}</span></button>`).join('');
  renderActivity(`<div class="animal-top-label" id="animal-scene-instruction">Psst … alla djur gömmer sig här!</div><div class="animal-skyline" id="animal-skyline" aria-label="Tryck på ett djur">${allAnimalCards}</div><button class="animal-challenge-button" type="button" id="animal-challenge"><span aria-hidden="true">✦</span> Lyssna & hitta!</button><div class="stage-word" id="stage-word" hidden><div class="stage-word-pill"><span class="word-icon" aria-hidden="true">✳</span><span id="animal-word-text"></span></div><button class="stage-word-replay" id="animal-word-replay" type="button" aria-label="Lyssna på djurets namn igen"><svg><use href="#icon-volume"/></svg></button></div>`);
  $('#challenge-count').textContent = '';
  $('#replay-prompt').disabled = false;
  $('#replay-prompt').onclick = () => speak(state.challengeTarget ? `Var är ${animalWords.find((animal) => animal.id === state.challengeTarget)?.word.toLowerCase()}?` : 'Tryck på en djurkompis och lyssna på vad den heter.');
  $('#animal-challenge').addEventListener('click', startAnimalChallenge);
  $('#animal-word-replay').addEventListener('click', () => {
    if (state.revealed) speak(animalWords.find(({ id }) => id === state.revealed)?.word);
  });
  $$('.animal-spot').forEach((button) => button.addEventListener('click', () => selectAnimal(button.dataset.animal)));
}
function selectAnimal(id) {
  const animal = animalWords.find((item) => item.id === id);
  if (!animal) return;
  if (state.challengeTarget && state.challengeTarget === id) {
    state.revealed = id;
    $('#stage-word').hidden = false;
    $('#animal-word-text').textContent = animal.word;
    checkAnimalAnswer(id);
    speak(animal.word);
    return;
  }
  state.revealed = id;
  $$('.animal-spot').forEach((button) => {
    button.classList.toggle('show-label', button.dataset.animal === id);
    button.classList.toggle('is-correct', button.dataset.animal === id && state.challengeTarget === id);
    button.classList.toggle('is-wrong', button.dataset.animal === id && state.challengeTarget && state.challengeTarget !== id);
    if (button.dataset.animal === id) button.setAttribute('aria-label', `${animal.word}. Lyssna igen på ordet.`);
    else button.setAttribute('aria-label', `Tryck för att höra: ${animalWords.find((item) => item.id === button.dataset.animal).word}`);
  });
  $('#stage-word').hidden = false;
  $('#animal-word-text').textContent = animal.word;
  speak(animal.word);
  if (state.challengeTarget) checkAnimalAnswer(id);
}
function startAnimalChallenge() {
  if (!state.challengeTarget) {
    let next = animalWords.filter(({ id }) => !state.correctAnimals.has(id));
    if (!next.length) {
      state.correctAnimals.clear();
      next = [...animalWords];
    }
    const target = next[Math.floor(Math.random() * next.length)];
    state.challengeTarget = target.id;
    state.round++;
    $('#game-title').textContent = 'Vilket djur hör du?';
    $('#game-eyebrow').textContent = 'LYSSNA NOGA';
    $('#game-subtitle').textContent = 'Kan du hitta den som låter så?';
    $('#animal-challenge').innerHTML = '<span aria-hidden="true">✓</span> Jag hittade den!';
    $('#animal-challenge').setAttribute('aria-label', 'Avsluta lyssna och hitta-utmaningen');
    $('#animal-challenge').onclick = () => {
      state.challengeTarget = null;
      $('#animal-challenge').onclick = startAnimalChallenge;
      $('#animal-challenge').innerHTML = '<span aria-hidden="true">✦</span> Lyssna & hitta!';
      $('#animal-challenge').removeAttribute('aria-label');
      $('#animal-scene-instruction').textContent = 'Tryck på en kompis och säg hej!';
      $('#game-title').textContent = 'Hej, djurkompisar!';
      $('#game-eyebrow').textContent = 'ETT LITET ÄVENTYR';
      $('#game-subtitle').textContent = 'Tryck på en kompis och säg hej.';
      $('#challenge-count').textContent = '';
    };
    $('#animal-scene-instruction').textContent = `Lyssna på Morris: Var är ${target.word.toLowerCase()}?`;
    $('#challenge-count').textContent = `DINA UPPDRAG: ${state.correctCount}`;
    $$('.animal-spot').forEach((button) => { button.classList.remove('show-label', 'is-correct', 'is-wrong'); button.setAttribute('aria-label', `Hitta djuret ${animalWords.find((animal) => animal.id === button.dataset.animal).word}`); });
    $('#stage-word').hidden = true;
    speak(`Var är ${target.word.toLowerCase()}?`);
    return;
  }
  state.challengeTarget = null;
  $('#animal-challenge').onclick = startAnimalChallenge;
  $('#animal-challenge').innerHTML = '<span aria-hidden="true">✦</span> Lyssna & hitta!';
  $('#animal-challenge').removeAttribute('aria-label');
  $('#animal-scene-instruction').textContent = 'Tryck på en kompis och säg hej!';
  $('#game-title').textContent = 'Hej, djurkompisar!';
  $('#game-eyebrow').textContent = 'ETT LITET ÄVENTYR';
  $('#game-subtitle').textContent = 'Tryck på en kompis och säg hej.';
  $('#challenge-count').textContent = '';
  $$('.animal-spot').forEach((button) => button.setAttribute('aria-label', `Tryck för att höra: ${animalWords.find((animal) => animal.id === button.dataset.animal).word}`));
}
function checkAnimalAnswer(id) {
  if (state.challengeTarget !== id) {
    $$('.animal-spot').forEach((button) => button.classList.remove('is-wrong'));
    const wrong = $(`.animal-spot[data-animal="${id}"]`);
    if (wrong) { void wrong.offsetWidth; wrong.classList.add('is-wrong'); }
    announceRetry();
    return;
  }
  const animal = animalWords.find((entry) => entry.id === id);
  state.correctAnimals.add(id);
  state.correctCount++;
  $('#stage-word').hidden = false;
  $('#animal-word-text').textContent = animal.word;
  const rewarded = addStar('animals');
  announceCorrect(rewarded ? 'En ny stjärna till dig, Elias!' : nextCompliment());
  $('#game-title').textContent = animal.word + '!';
  $('#game-subtitle').textContent = 'Vilken fin kompis du hittade.';
  $('#animal-scene-instruction').textContent = `${state.correctAnimals.size} djur${state.correctAnimals.size === 1 ? '' : ''} hittade — det finns fler!`;
  $('#challenge-count').textContent = `RÄTTA SVAR: ${state.correctCount}`;
  state.challengeTarget = null;
  $('#animal-challenge').onclick = startAnimalChallenge;
  $('#animal-challenge').innerHTML = '<span aria-hidden="true">✦</span> Nästa djur!';
  $('#animal-challenge').removeAttribute('aria-label');
}

function initColors() {
  state.colorsRound = 0;
  state.colorCorrect = 0;
  state.colorTarget = null;
  state.lastColorId = null;
  $('#game-title').textContent = 'Dags för färgspaning!';
  $('#game-eyebrow').textContent = 'EN LEK MED FÄRGER';
  $('#game-subtitle').textContent = 'Kika på alla fina saker.';
  $('#replay-prompt').setAttribute('aria-label', 'Lyssna på färgen igen');
  $('#replay-prompt').onclick = () => state.colorTarget && speak(`Hitta något ${state.colorTarget.word.toLowerCase()}!`);
  nextColorChallenge();
}
function nextColorChallenge() {
  state.colorTarget = chooseNextColor(colorWords, state.lastColorId);
  state.colorsRound++;
  const target = state.colorTarget;
  state.colorOrder = [...colorWords].sort(() => Math.random() - .5);
  $('#game-title').textContent = 'Hitta rätt färg!';
  $('#game-eyebrow').textContent = 'SPANA MED ÖGONEN';
  $('#game-subtitle').textContent = 'Tryck på en sak som har rätt färg.';
  renderActivity(`<div class="color-layout"><div class="color-prompt-side"><div class="color-prompt-kicker">KAN DU HITTA NÅGOT</div><h2 class="color-title">Hitta något <span class="color-word" style="color:${target.color}">${target.word.toLowerCase()}!</span></h2><div class="color-swatch"><span class="color-swatch-dot" style="background:${target.color}"></span><span>En färg och en liten upptäckt</span></div></div><div class="color-object-grid" aria-label="Välj det ${target.word.toLowerCase()} föremålet">${state.colorOrder.map((item) => `<button type="button" class="color-object" data-color="${item.id}" aria-label="${item.word}, ${item.label}"><img class="color-object-art" src="${colorArt[item.id]}" alt="" draggable="false"><span class="color-object-label">${item.label}</span></button>`).join('')}</div></div><div class="color-footer-hint">Färger berättar mer när vi tittar noga <span aria-hidden="true">✿</span></div>`);
  $('#challenge-count').textContent = `SMÅ FÄRGUPPDRAG: ${state.colorCorrect}`;
  $$('.color-object').forEach((button) => button.addEventListener('click', () => selectColor(button.dataset.color, button)));
  $('#replay-prompt').onclick = () => speak(`Hitta något ${target.word.toLowerCase()}!`);
  speak(`Hitta något ${target.word.toLowerCase()}!`);
}
function selectColor(id, button) {
  if (!state.colorTarget) return;
  if (state.colorTarget.id !== id) {
    button.classList.remove('is-wrong');
    void button.offsetWidth;
    button.classList.add('is-wrong');
    announceRetry();
    return;
  }
  const target = state.colorTarget;
  state.colorCorrect++;
  state.lastColorId = target.id;
  addStar('colors');
  button.classList.add('is-correct');
  $('#game-title').textContent = `${target.word}!`;
  $('#game-subtitle').textContent = `Du hittade ${target.object}. Så fint sett!`;
  $('#challenge-count').textContent = `RÄTTA FÄRGUPPDRAG: ${state.colorCorrect}`;
  announceCorrect(state.colorCorrect === 1 ? 'Du hittade den! Vad fint, Elias!' : nextCompliment());
  state.colorTarget = null;
  const answeredColor = target;
  $('#activity-content').replaceChildren();
  setTimeout(() => {
    if (state.screen === 'game' && state.world === 'colors' && !state.colorTarget && state.lastColorId === answeredColor.id) nextColorChallenge();
  }, 650);
}

function shufflePuzzle() {
  const puzzle = createPuzzleState();
  state.puzzlePieces = puzzle.pieces;
  state.puzzleSlots = puzzle.slots;
}
function initPuzzle() {
  state.puzzleSelected = null;
  state.puzzlePointer = null;
  state.puzzleCompleted = false;
  shufflePuzzle();
  $('#game-title').textContent = 'Lägg pusslet!';
  $('#game-eyebrow').textContent = 'EN LITEN BIT I TAGET';
  $('#game-subtitle').textContent = 'Bygg ihop bilden av ankungen.';
  $('#challenge-count').textContent = 'FYRA BITAR, EN LITEN ANKUNGE';
  $('#replay-prompt').setAttribute('aria-label', 'Lyssna på vilket djur som gömmer sig');
  $('#replay-prompt').onclick = () => speak('Kan du lägga pusslet? Vad gömmer sig på bilden?');
  renderPuzzle();
  addEventListener('pointermove', onPuzzlePointerMove);
  addEventListener('pointerup', onPuzzlePointerUp);
  $('#activity-content').addEventListener('click', onPuzzleClick);
  $('#activity-content').addEventListener('keydown', onPuzzleKeydown);
  speak('Lägg pusslet, en liten bit i taget!');
}
function renderPuzzle() {
  const completed = state.puzzleCompleted;
  const placedSlots = state.puzzleSlots.map((piece, target) => `<button type="button" class="puzzle-slot ${piece !== null ? 'filled' : ''}" data-slot="${target}" aria-label="${['Övre vänstra', 'Övre högra', 'Nedre vänstra', 'Nedre högra'][target]} pusselruta${piece === null ? ', tom' : ', med pusselbit'}">${piece === null ? '' : `<svg class="puzzle-tile-image" viewBox="${piece % 2 ? 200 : 0} ${piece >= 2 ? 160 : 0} 200 160" aria-hidden="true"><image href="${puzzleSceneUri}" width="400" height="320"/></svg>`}</button>`).join('');
  renderActivity(`<div class="puzzle-layout"><div class="puzzle-illustration">${completed ? `<div class="puzzle-target puzzle-complete-art-wrap"><svg class="puzzle-complete-art" viewBox="0 0 400 320" role="img" aria-label="En glad ankunge står på den gröna ängen"><image href="${puzzleSceneUri}" width="400" height="320"/></svg></div>` : `<div class="puzzle-target" role="group" aria-label="Tryck på en pusselbit och sedan på dess ruta">${placedSlots}</div>`}<p class="puzzle-caption">${completed ? 'En solig dag på ängen' : 'Här håller din bild på att växa'}</p></div>${completed ? `<div class="puzzle-complete"><div class="puzzle-complete-title">Hurra, du klarade det!</div><p class="puzzle-complete-word">En anka</p><p class="puzzle-complete-message">En liten, glad ankunge! ✿</p><button class="puzzle-again-button" type="button" id="puzzle-again">Bygg igen!</button></div>` : `<div class="puzzle-builder"><h2>Vem bor här?</h2><p>Välj en bit. Lägg den där bilden passar.</p><div class="puzzle-tray" aria-label="Välj en pusselbit">${state.puzzlePieces.map((piece, index) => `<button class="puzzle-piece ${state.puzzleSelected === index ? 'puzzle-selection' : ''}" type="button" data-piece="${index}" aria-label="${state.puzzleSelected === index ? 'Vald pusselbit' : 'Välj pusselbit'} ${index + 1}" aria-pressed="${state.puzzleSelected === index}" tabindex="0"><span class="piece-order" aria-hidden="true">${index + 1}</span><svg class="puzzle-tile-image" viewBox="${piece % 2 ? 200 : 0} ${piece >= 2 ? 160 : 0} 200 160" role="img" aria-label="Pusselbit ${index + 1}"><image href="${puzzleSceneUri}" width="400" height="320"/></svg></button>`).join('')}</div><button class="puzzle-restart" id="puzzle-restart" type="button"><span aria-hidden="true">↻</span> Blanda bitarna igen</button></div>`}</div>`);
  if (completed) {
    $('#puzzle-again').addEventListener('click', () => { state.puzzleCompleted = false; state.puzzleSelected = null; shufflePuzzle(); $('#game-title').textContent = 'Lägg pusslet!'; $('#game-subtitle').textContent = 'Bygg ihop bilden av ankungen.'; renderPuzzle(); speak('Bygg pusslet igen!'); });
    return;
  }
  $('#puzzle-restart').addEventListener('click', () => { state.puzzleSelected = null; shufflePuzzle(); renderPuzzle(); });
  $$('.puzzle-piece').forEach((piece) => piece.addEventListener('pointerdown', (event) => beginPuzzlePointer(event, Number(piece.dataset.piece))));
}
function beginPuzzlePointer(event, pieceIndex) {
  if (event.button !== undefined && event.button !== 0 || state.puzzleCompleted) return;
  if (state.puzzlePieces[pieceIndex] === undefined) return;
  state.puzzlePointer = { piece: state.puzzlePieces[pieceIndex], x: event.clientX, y: event.clientY, dragging: false };
}
function onPuzzlePointerMove(event) {
  const pointer = state.puzzlePointer;
  if (!pointer || state.screen !== 'game' || state.world !== 'puzzle') return;
  const distance = Math.hypot(event.clientX - pointer.x, event.clientY - pointer.y);
  const trayIndex = state.puzzlePieces.findIndex((piece) => piece === pointer.piece);
  if (trayIndex === -1) return;
  const piece = $(`.puzzle-piece[data-piece="${trayIndex}"]`);
  if (distance > 7 && !pointer.dragging && piece) {
    pointer.dragging = true;
    const rect = piece.getBoundingClientRect();
    const ghost = piece.cloneNode(true);
    ghost.classList.remove('puzzle-selection');
    ghost.classList.add('puzzle-drag-ghost');
    ghost.style.cssText = `position:fixed;z-index:50;pointer-events:none;left:${event.clientX - rect.width / 2}px;top:${event.clientY - rect.height / 2}px;width:${rect.width}px;height:${rect.height}px;opacity:.95;transform:rotate(-3deg) scale(1.04);box-shadow:0 12px 24px #695e4740`;
    document.body.appendChild(ghost);
    state.puzzleGhost = ghost;
    piece.classList.add('piece-used');
  }
  if (state.puzzlePointer?.dragging && state.puzzleGhost) {
    state.puzzleGhost.style.left = `${event.clientX - state.puzzleGhost.offsetWidth / 2}px`;
    state.puzzleGhost.style.top = `${event.clientY - state.puzzleGhost.offsetHeight / 2}px`;
    $$('.puzzle-slot').forEach((slot) => slot.classList.toggle('dragover', slot.dataset.slot === document.elementFromPoint(event.clientX, event.clientY)?.closest('.puzzle-slot')?.dataset.slot));
  }
}
function onPuzzlePointerUp(event) {
  const pointer = state.puzzlePointer;
  if (!pointer || state.screen !== 'game' || state.world !== 'puzzle') return;
  state.puzzlePointer = null;
  if (!pointer.dragging) return;
  const slot = document.elementFromPoint(event.clientX, event.clientY)?.closest('.puzzle-slot');
  state.puzzleGhost?.remove();
  state.puzzleGhost = null;
  $$('.puzzle-slot').forEach((item) => item.classList.remove('dragover'));
  if (slot && state.puzzleSlots[Number(slot.dataset.slot)] === null) {
    placePuzzlePiece(state.puzzlePieces.indexOf(pointer.piece), Number(slot.dataset.slot));
  } else {
    renderPuzzle();
  }
}
function onPuzzleClick(event) {
  const piece = event.target.closest('.puzzle-piece');
  const slot = event.target.closest('.puzzle-slot');
  if (piece) {
    const nextPiece = Number(piece.dataset.piece);
    state.puzzleSelected = state.puzzlePieces[nextPiece];
    renderPuzzle();
    const next = $(`.puzzle-piece[data-piece="${nextPiece}"]`);
    if (next) next.focus({ preventScroll: true });
    return;
  }
  if (state.puzzleSelected !== null && slot) {
    const trayIndex = state.puzzlePieces.indexOf(state.puzzleSelected);
    if (trayIndex !== -1) placePuzzlePiece(trayIndex, Number(slot.dataset.slot));
    return;
  }
  if (slot) {
    const index = Number(slot.dataset.slot);
    if (state.puzzleSlots[index] === null && state.puzzleSelected !== null) {
      const trayIndex = state.puzzlePieces.indexOf(state.puzzleSelected);
      if (trayIndex !== -1) placePuzzlePiece(trayIndex, index);
      return;
    }
    if (state.puzzleSlots[index] !== null) {
      const returnedPiece = state.puzzleSlots[index];
      state.puzzleSlots[index] = null;
      state.puzzlePieces.push(returnedPiece);
      state.puzzleSelected = null;
      renderPuzzle();
      return;
    }
    if (state.puzzleSelected !== null) {
      const trayIndex = state.puzzlePieces.indexOf(state.puzzleSelected);
      if (trayIndex !== -1) placePuzzlePiece(trayIndex, index);
    }
  }
}
function onPuzzleKeydown(event) {
  const piece = event.target.closest('.puzzle-piece');
  if (!piece && !event.target.closest('.puzzle-slot')) return;
  const slot = event.target.closest('.puzzle-slot');
  if (event.key === 'Escape' && state.puzzleSelected !== null) { state.puzzleSelected = null; renderPuzzle(); return; }
  if (piece && (event.key === 'Enter' || event.key === ' ')) {
    event.preventDefault();
    const nextPiece = Number(piece.dataset.piece);
    state.puzzleSelected = state.puzzlePieces[nextPiece];
    const firstUnfilledSlot = $('.puzzle-slot:not(.filled)');
    if (firstUnfilledSlot) { firstUnfilledSlot.focus({ preventScroll: true }); return; }
    renderPuzzle();
    $(`.puzzle-piece[data-piece="${nextPiece}"]`)?.focus({ preventScroll: true });
  } else if (slot && (event.key === 'Enter' || event.key === ' ')) {
    event.preventDefault();
    const index = Number(slot.dataset.slot);
    if (state.puzzleSlots[index] === null && state.puzzleSelected !== null) {
      const trayIndex = state.puzzlePieces.indexOf(state.puzzleSelected);
      if (trayIndex !== -1) placePuzzlePiece(trayIndex, index);
      return;
    }
    if (state.puzzleSlots[index] !== null) {
      const returnedPiece = state.puzzleSlots[index];
      state.puzzleSlots[index] = null;
      state.puzzlePieces.push(returnedPiece);
      state.puzzleSelected = null;
      renderPuzzle();
    } else if (state.puzzleSelected !== null) {
      const trayIndex = state.puzzlePieces.indexOf(state.puzzleSelected);
      if (trayIndex !== -1) placePuzzlePiece(trayIndex, index);
    }
  }
}
function placePuzzlePiece(pieceIndex, targetIndex) {
  const puzzle = { pieces: state.puzzlePieces, slots: state.puzzleSlots, selected: state.puzzleSelected, completed: state.puzzleCompleted };
  const result = placePuzzlePieceLogic(puzzle, pieceIndex, targetIndex);
  state.puzzleSelected = puzzle.selected;
  if (result === 'invalid') return;
  const correctPieceCount = state.puzzleSlots.filter((piece, index) => piece === index).length;
  if (result === 'wrong') {
    renderPuzzle();
    const incorrectSlot = $(`.puzzle-slot[data-slot="${targetIndex}"]`);
    incorrectSlot?.classList.add('is-wrong');
    announceRetry();
    setTimeout(() => {
      if (state.screen === 'game' && state.world === 'puzzle' && !state.puzzleCompleted && state.puzzleSlots[targetIndex] !== null) {
        state.puzzlePieces.push(state.puzzleSlots[targetIndex]);
        state.puzzleSlots[targetIndex] = null;
        renderPuzzle();
      }
    }, 450);
    return;
  }
  if (result === 'completed') {
    state.puzzleCompleted = true;
    addStar('puzzle');
    $('#game-title').textContent = 'Du la pusslet!';
    $('#game-subtitle').textContent = 'Titta vem som gömde sig i bilden.';
    $('#challenge-count').textContent = 'HELA BILDEN KLAR ✦';
    renderPuzzle();
    announceCorrect('Hurra, du klarade det, Elias!');
    setTimeout(() => { if (state.screen === 'game' && state.world === 'puzzle' && state.puzzleCompleted) speak('En anka! Bra jobbat, Elias!'); }, 700);
    return;
  }
  renderPuzzle();
  $('#challenge-count').textContent = `PUSSELBITAR: ${correctPieceCount} AV 4 ✦`;
  showFeedback(correctPieceCount === 3 ? 'Sista biten! Vem gömmer sig?' : `${correctPieceCount} av 4 bitar på plats!`, true, 1050);
  chime('correct');
}

$$('[data-home]').forEach((button) => button.addEventListener('click', (event) => { if (button.tagName === 'A') event.preventDefault(); setScreen('home'); }));
$$('[data-open-world]').forEach((button) => button.addEventListener('click', () => openWorld(button.dataset.openWorld)));
$('.sound-toggle').addEventListener('click', () => setSoundEnabled(!state.soundEnabled));
$('#native-voice-toggle').addEventListener('change', (event) => {
  state.forceNative = event.currentTarget.checked;
  stopCurrentAudio();
  updateVoiceStatus(state.forceNative ? 'Använder svensk röst från din webbläsare i stället.' : 'ElevenLabs väljs i första hand. Svensk webbläsarröst används om ElevenLabs inte är tillgängligt.');
});
window.addEventListener('keydown', (event) => { if (event.key === 'Escape' && state.screen === 'game') setScreen('home'); });
window.addEventListener('beforeunload', () => { stopCurrentAudio(); removeEventListener('pointermove', onPuzzlePointerMove); removeEventListener('pointerup', onPuzzlePointerUp); });
if ('speechSynthesis' in window) {
  speechSynthesis.addEventListener?.('voiceschanged', () => {
    if (!nativeSwedishVoice()) updateVoiceStatus('Ingen svensk röst hittades ännu på din enhet. Du kan fortfarande leka vidare.');
  });
  try { const savedVoice = localStorage.getItem('elias-angslandet-native-voice') === 'true'; state.forceNative = savedVoice; $('#native-voice-toggle').checked = savedVoice; } catch { /* Optional parent preference. */ }
}
$('#native-voice-toggle').addEventListener('change', (event) => { try { localStorage.setItem('elias-angslandet-native-voice', String(event.currentTarget.checked)); } catch { /* Optional parent preference. */ } });
setSoundEnabled(true);
updateProgressUI();
if (location.hash && ['#animals', '#colors', '#puzzle'].includes(location.hash)) openWorld(location.hash.slice(1) === 'colors' ? 'colors' : location.hash.slice(1) === 'puzzle' ? 'puzzle' : 'animals'); else setScreen('home');
