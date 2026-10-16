import { useCallback, useRef } from "react"
import { useAppStore } from "../store/useAppStore"
import { AUDIO_MAP } from "../lib/audio_map"

export function useVoice() {
  const voiceOn = useAppStore(s => s.voiceOn)
  const childName = useAppStore(s => s.childName)
  const idRef = useRef(0)
  const audioRef = useRef(null)
  const speakingRef = useRef(false)
  const audioCtxRef = useRef(null)

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

  const getFileName = (text) => {
    const clean = (text || "").replace(/[\p{Extended_Pictographic}\uFE0F\u200D]/gu, "").replace(/\s+/g, " ").trim()
    const lowerClean = clean.toLowerCase()
    for (const [key, file] of Object.entries(AUDIO_MAP)) {
      const lowKey = key.toLowerCase().replace("{name}", "").trim()
      if (lowKey && (lowerClean.includes(lowKey) || lowKey.includes(lowerClean) || lowerClean === lowKey)) {
        return file
      }
    }
    return null
  }

  const speak = useCallback(async (text) => {
    if (!voiceOn) return
    stop() // prevent overlapping speech
    const id = ++idRef.current
    speakingRef.current = true
    const clean = (text || "").replace(/[\p{Extended_Pictographic}\uFE0F\u200D]/gu, "").replace(/\s+/g, " ").trim()
    if (!clean) { speakingRef.current = false; return }

    const file = getFileName(clean)
    if (file && id === idRef.current) {
      try {
        const audio = new Audio(`/audio/sv-SE/${file}.wav`)
        audioRef.current = audio
        audio.play().catch(() => {})
        audio.onended = () => {
          if (audioRef.current === audio) audioRef.current = null
          speakingRef.current = false
        }
        audio.onerror = () => { speakingRef.current = false }
      } catch (e) {}
    }
  }, [voiceOn, childName])

  const isSpeaking = () => speakingRef.current

  const welcome = useCallback(() => speak(`Välkommen ${childName}!`), [speak, childName])

  return { speak, stop, warm, isSpeaking, voiceOn, key: "piper-alma-sv", voiceId: "sv_SE-alma-medium" }
}
