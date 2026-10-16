#!/usr/bin/env python3
"""Generate all Swedish audio assets for Djurkompisarna using Piper Alma sv_SE-alma-medium."""
from pathlib import Path
import wave
from piper import PiperVoice

VOICE_PATH = Path("/Users/haythem_dhahri/Desktop/projects/website/child-learning/scripts/voice/sv_SE-alma-medium.onnx")
OUT_DIR = Path("/Users/haythem_dhahri/Desktop/projects/website/child-learning/public/audio/sv-SE")
OUT_DIR.mkdir(parents=True, exist_ok=True)

Phrases = {
    # Welcome / splash
    "welcome": "Välkommen Elias!",
    "start_lek": "Starta lek!",
    # Hero / Home
    "hej_lilla_upptackare": "Hej lilla upptäckare!",
    "valj_ett_spel": "Välj ett spel, klara nivåerna och samla stjärnor. Du klarar det – prova igen!",
    "vad_vill_du_leka": "Vad vill du leka?",
    # Animals / colors / counts / etc.
    "djur_och_ljud": "Djur och ljud",
    "memory": "Memory",
    "farger_och_former": "Färger och former",
    "rakna": "Räkna",
    "bokstaver_och_ord": "Bokstäver och ord",
    "logik_och_monster": "Logik och mönster",
    "hitta_garaget": "Hitta garaget",
    "hitta_skuggan": "Hitta skuggan",
    # Positive feedback
    "bra_jobbat": "Bra jobbat!",
    "fantastiskt": "Fantastiskt!",
    "perfekt": "Perfekt!",
    "snyggt": "Snyggt!",
    "so_duktig": "Så duktig!",
    "du_ar_grym": "Du är grym!",
    # Retry / wrong
    "nasta": "Nästan! Du klarar det!",
    # Completed / stars
    "grattis": "Grattis! Nivå klar!",
    "perfekt_alla_ratt": "Perfekt! Alla rätt!",
}

v = PiperVoice.load(str(VOICE_PATH))

for key, text in Phrases.items():
    out_path = OUT_DIR / f"{key}.wav"
    with wave.open(str(out_path), 'wb') as w:
        w.setnchannels(1)
        w.setsampwidth(2)
        w.setframerate(22050)
        v.synthesize_wav(text, w)
    print(f"✓ {key}.wav ({len(text)} chars)")

print("All audio generated.")
