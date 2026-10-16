# Piper Alma Voice — License & Attribution

## Voice Model
- Model: `sv_SE-alma-medium` (Piper TTS, ONNX)
- Source: https://huggingface.co/rhasspy/piper-voices/tree/main/sv/sv_SE/alma/medium
- Model weight file: `scripts/voice/sv_SE-alma-medium.onnx` (60.4 MB, not committed)
- Config file: `scripts/voice/sv_SE-alma-medium.onnx.json`
- License of voice model: MIT (Rhasspy / Piper voices repo)

## Generated Audio
- Files in `public/audio/sv-SE/*.wav` (generated with Piper TTS)
- Audio generated locally; not distributed under a separate license unless required by model
- Use for this Swedish children's learning game only

## Attribution
- Voice synthesis: Piper TTS (https://github.com/rhasspy/piper) — MIT license
- Swedish voice: Alma / sv_SE-alma-medium from Rhasspy piper-voices
- Generated with `piper-tts` Python package (installed via pip)

## Regeneration
```bash
python3 scripts/generate/generate_audio.py
```
Requires `piper-tts` and the `sv_SE-alma-medium.onnx` model in `scripts/voice/`.
