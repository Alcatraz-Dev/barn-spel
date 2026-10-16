import { useCallback, useRef } from "react"
import { useAppStore } from "../store/useAppStore"

// Only Bella from ElevenLabs — load from .env
const ELEVEN_KEY = import.meta.env?.VITE_ELEVENLABS_API_KEY || "sk_f56aee03a6c8368126ee36ff9895548af69ee2d1181e9903"
const ELEVEN_VOICE = import.meta.env?.VITE_ELEVENLABS_VOICE_ID || "EXAVITQu4vr4xnSDxMaL"
const ELEVEN_URL = `https://api.elevenlabs.io/v1/text-to-speech/${ELEVEN_VOICE}`

export function useVoice() {
  const voiceOn = useAppStore(s => s.voiceOn)
  const childName = useAppStore(s => s.childName)
  const idRef = useRef(0)
  const audioRef = useRef(null)
  const speakingRef = useRef(false)
  const audioCtxRef = useRef(null)

  // Unlock audio context on first user gesture
  const warm = useCallback(() => {
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext
      if (AudioContext && !audioCtxRef.current) {
        audioCtxRef.current = new AudioContext()
        if (audioCtxRef.current.state === "suspended") {
          audioCtxRef.current.resume()
        }
      }
    } catch (e) {}
  }, [])

  const stop = useCallback(() => {
    idRef.current++
    speakingRef.current = false
    if (audioRef.current) {
      try { audioRef.current.pause(); audioRef.current.currentTime = 0 } catch {}
      audioRef.current = null
    }
  }, [])

  const speak = useCallback(async (text) => {
    if (!voiceOn) return
    const id = ++idRef.current
    speakingRef.current = true
    const clean = (text || "").replace(/[\p{Extended_Pictographic}\uFE0F\u200D]/gu, "").replace(/\s+/g, " ").trim()
    if (!clean) { speakingRef.current = false; return }

    try {
      const res = await fetch(ELEVEN_URL, {
        method: "POST",
        headers: {
          "xi-api-key": ELEVEN_KEY,
          "Content-Type": "application/json",
          "Accept": "audio/mpeg"
        },
        body: JSON.stringify({
          text: clean,
          model_id: "eleven_multilingual_v2",
          voice_settings: { stability: 0.5, similarity_boost: 0.75, use_speaker_boost: true }
        })
      })
      if (res.ok && id === idRef.current) {
        const blob = await res.blob()
        const url = URL.createObjectURL(blob)
        const audio = new Audio(url)
        audioRef.current = audio
        audio.play().catch(() => {})
        audio.onended = () => {
          URL.revokeObjectURL(url)
          if (audioRef.current === audio) audioRef.current = null
          speakingRef.current = false
        }
      }
    } catch (e) {}
  }, [voiceOn])

  const isSpeaking = () => speakingRef.current

  const welcome = useCallback(() => speak(`Välkommen ${childName}!`), [speak, childName])

  return { speak, stop, warm, isSpeaking, voiceOn, key: ELEVEN_KEY, voiceId: ELEVEN_VOICE }
}
