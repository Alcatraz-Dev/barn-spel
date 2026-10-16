import { useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import confetti from "canvas-confetti"
import { useVoice } from "../hooks/useVoice"

export default function DoneModal({ open, stars, level, total, nextUnlocked, onNext, onRetry, onLevels }) {
  const { speak } = useVoice()

  useEffect(() => {
    if (!open) return
    const msg = stars === 3 ? "Fantastiskt! Perfekt! Alla rätt! ⭐⭐⭐" : stars === 2 ? "Snyggt jobbat! Du är grym! ⭐⭐" : "Bra kämpat! Du klarade nivån! ⭐"
    speak(msg)
    if (stars === 3) {
      const duration = 900
      const end = Date.now() + duration
      const colors = ["#6c63ff", "#73d69a", "#ffe99b", "#ffd8e8", "#cdeaff"]
      const frame = () => {
        confetti({ particleCount: 5, angle: 60, spread: 60, origin: { x: 0 }, colors, scalar: 0.9 })
        confetti({ particleCount: 5, angle: 120, spread: 60, origin: { x: 1 }, colors, scalar: 0.9 })
        if (Date.now() < end) requestAnimationFrame(frame)
      }
      requestAnimationFrame(frame)
    }
  }, [open, stars])

  if (!open) return null

  const emoji = stars === 3 ? "🏆" : stars === 2 ? "🎉" : "💪"
  const title = stars === 3 ? "Perfekt! Alla rätt!" : stars === 2 ? "Snyggt jobbat!" : "Bra kämpat!"

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[80] flex items-center justify-center px-4 bg-ink/60 backdrop-blur-[1px]">
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0, y: 10 }}
          transition={{ type: "spring", stiffness: 300, damping: 24 }}
          className="relative w-full max-w-[460px] rounded-[28px] bg-white p-6 sm:p-8 text-center shadow-[0_10px_0_rgba(220,226,244,0.9)]"
        >
          <div className="text-7xl">{emoji}</div>
          <h2 className="mt-2 text-2xl sm:text-3xl font-extrabold text-primary">{title}</h2>
          <div className="mt-2 text-3xl font-extrabold tracking-[8px] text-amber-400">{"⭐".repeat(stars)}{"☆".repeat(3 - stars)}</div>
          <p className="mt-1 text-base text-slate-600">Nivå {level} klar • {total} stjärnor totalt</p>
          {nextUnlocked && <p className="mt-1 text-sm font-extrabold text-emerald-600">Ny nivå upplåst! 🔓</p>}
          <div className="mt-5 flex flex-wrap justify-center gap-2">
            {nextUnlocked && (
              <button onClick={onNext} className="rounded-2xl bg-primary px-5 py-2.5 text-white font-extrabold shadow-[0_5px_0_rgba(73,66,189,0.9)] active:scale-[0.98]">Nästa nivå →</button>
            )}
            <button onClick={onRetry} className="rounded-2xl bg-emerald-400 px-5 py-2.5 text-white font-extrabold shadow-[0_5px_0_rgba(79,174,116,0.9)] active:scale-[0.98]">Spela igen 🔄</button>
            <button onClick={onLevels} className="rounded-2xl bg-white px-5 py-2.5 font-extrabold shadow-[0_4px_0_rgba(220,226,244,0.9)] active:scale-[0.98]">Till nivåer</button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  )
}
