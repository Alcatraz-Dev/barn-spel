import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { useVoice } from "../hooks/useVoice"
import { useAppStore } from "../store/useAppStore"

export default function SplashScreen({ onDone }) {
  const { speak, stop, warm } = useVoice()
  const childName = useAppStore(s => s.childName)
  const [played, setPlayed] = useState(false)

  useEffect(() => {
    // Auto-trigger after brief delay if possible; browser usually needs click
    const t = setTimeout(() => { setPlayed(true) }, 400)
    return () => clearTimeout(t)
  }, [])

  function handleStart() {
    warm() // unlock AudioContext
    speak(`Välkommen ${childName}!`)
    setTimeout(() => {
      stop()
      onDone()
    }, 1800)
  }

  return (
    <div className="min-h-dvh flex items-center justify-center bg-gradient-to-br from-[#cdeaff] via-[#ffe99b]/40 to-[#ffd8e8] px-4">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="text-center max-w-md"
      >
        <div className="text-9xl sm:text-[12rem] drop-shadow-lg">🦁</div>
        <h1 className="mt-4 text-4xl sm:text-6xl font-extrabold text-[#4d46c8]">Djurkompisarna</h1>
        <p className="mt-2 text-2xl sm:text-3xl font-extrabold text-[#26324a]">Välkommen <span className="text-[#6c63ff]">{childName}</span>!</p>
        <p className="mt-3 text-base text-[#65718a]">Klicka för att höra rösten och börja leken.</p>
        <button
          onClick={handleStart}
          className="mt-8 rounded-full bg-[#6c63ff] px-10 py-4 text-xl sm:text-2xl font-extrabold text-white shadow-[0_8px_0_#4942bd] hover:scale-[1.05] active:scale-[0.98] transition animate-bounce"
        >
          Starta lek! ⭐
        </button>
      </motion.div>
    </div>
  )
}
