import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"

export default function AnimalGame({ level, onCorrect, onWrong, speak, locked, qIndex }) {
  const animals = [
    { name: "Katt", emoji: "🐱", sound: "Mjau! Katt." },
    { name: "Hund", emoji: "🐶", sound: "Voff! Hund." },
    { name: "Ko", emoji: "🐮", sound: "Muu! Ko." },
    { name: "Lejon", emoji: "🦁", sound: "Raa! Lejon." },
    { name: "Anka", emoji: "🦆", sound: "Kvack! Anka." }
  ]
  const [target, setTarget] = useState(null)
  const [picked, setPicked] = useState(null)

  useEffect(() => {
    const t = animals[Math.floor(Math.random() * animals.length)]
    setTarget(t)
    setPicked(null)
    speak("Hitta " + t.name)
  }, [level, qIndex || 0, speak])

  if (!target) return <div className="text-center p-8">Laddar...</div>

  return (
    <div className="text-center">
      <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-800 mb-2">Hitta <span className="text-[#6c63ff]">{target.emoji} {target.name}</span>!</h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 max-w-[500px] mx-auto mt-4">
        {animals.map((a) => (
          <motion.button
            key={a.name}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              if (locked) return
              setPicked(a.name)
              if (a.name === target.name) {
                onCorrect(target.sound + " Rätt! ⭐")
              } else {
                onWrong("Nästan! Prova igen.")
              }
            }}
            className={`rounded-3xl bg-gradient-to-br from-[#f3f5ff] to-[#eaeaff] p-6 shadow-[0_6px_0_rgba(223,228,245,0.9)] flex flex-col items-center gap-2 transition ${picked === a.name ? (a.name === target.name ? "ring-4 ring-emerald-400 bg-emerald-50" : "ring-4 ring-rose-300 bg-rose-50") : "hover:scale-105"}`}
          >
            <span className="text-6xl drop-shadow-sm">{a.emoji}</span>
            <span className="font-extrabold text-lg">{a.name}</span>
          </motion.button>
        ))}
      </div>
    </div>
  )
}
