import { useState, useEffect } from "react"
import { motion } from "framer-motion"

const garages = [
  { name: "röd", def: "röda", c: "#ff5a5f", num: 1 },
  { name: "blå", def: "blå", c: "#3d8bff", num: 2 },
  { name: "gul", def: "gula", c: "#ffc93c", num: 3 },
  { name: "grön", def: "gröna", c: "#3cc46b", num: 4 }
]

function CarSVG({ color, num }) {
  return (
    <svg viewBox="0 0 124 72" className="w-full h-auto"><path d="M8 48Q8 32 24 31L36 30L49 14Q53 9 60 9L83 9Q90 9 94 15L104 30Q116 31 116 45L116 54L8 54Z" fill={color} stroke="#26324a" strokeWidth="3" strokeLinejoin="round"/><path d="M42 30L53 16Q55 14 58 14L68 14L68 30Z" fill="#d6efff" stroke="#26324a" strokeWidth="2.5"/><path d="M74 30L74 14L84 14Q88 14 90 17L99 30Z" fill="#d6efff" stroke="#26324a" strokeWidth="2.5"/><circle cx="112" cy="41" r="3" fill="#fff6b0"/>{num ? <text x="60" y="49" textAnchor="middle" fontSize="18" fontWeight="900" fill="#26324a">{num}</text> : null}<circle cx="32" cy="56" r="11" fill="#26324a"/><circle cx="32" cy="56" r="4.5" fill="#cfd5e3"/><circle cx="92" cy="56" r="11" fill="#26324a"/><circle cx="92" cy="56" r="4.5" fill="#cfd5e3"/></svg>
  )
}

function GarageSVG({ color, num }) {
  return (
    <svg viewBox="0 0 120 112" className="w-full h-auto"><path d="M4 46L60 6L116 46Z" fill={color} stroke="#26324a" strokeWidth="3" strokeLinejoin="round"/><text x="60" y="40" textAnchor="middle" fontSize="22" fontWeight="900" fill="#fff" stroke="#26324a" strokeWidth="1">{num}</text><rect x="12" y="46" width="96" height="62" fill="#fff" stroke="#26324a" strokeWidth="3"/><rect x="24" y="58" width="72" height="50" fill={color} opacity=".55" stroke="#26324a" strokeWidth="2.5"/><path d="M24 70H96M24 82H96M24 94H96" stroke="#26324a" strokeWidth="2" opacity=".5"/></svg>
  )
}

export default function GarageGame({ level, onCorrect, onWrong, speak, locked, qIndex }) {
  const [goal, setGoal] = useState(garages[0])
  const [parked, setParked] = useState(false)
  const [carMoved, setCarMoved] = useState(false)

  const byNum = level >= 4 && Math.random() > 0.5

  useEffect(() => {
    const g = garages[Math.floor(Math.random() * garages.length)]
    setGoal(g)
    setParked(false)
    setCarMoved(false)
    if (byNum) {
      speak("Bilen har nummer " + g.num + ". Kör till garage " + g.num + "!")
    } else {
      speak("Kör den " + g.def + " bilen till det " + g.def + " garaget!")
    }
  }, [level, qIndex || 0, byNum, speak])

  const handlePark = (g) => {
    if (locked || parked) return
    if (g.name === goal.name) {
      setCarMoved(true)
      setTimeout(() => setParked(true), 800)
      onCorrect("Brum brum! Bilen är hemma! 🚗")
    } else {
      onWrong("Fel garage. Prova igen! 💛")
    }
  }

  return (
    <div className="text-center">
      <p className="text-lg sm:text-xl font-extrabold text-slate-700 mb-2">
        {byNum ? `Bilen har nummer ${goal.num}. Kör till garage ${goal.num}!` : `Kör den ${goal.def} bilen till det ${goal.def} garaget!`}
      </p>

      {/* Road */}
      <div className="relative mx-auto mt-4 h-[120px] sm:h-[150px] rounded-2xl bg-gradient-to-b from-[#9aa2b6] to-[#8a93a8] flex items-center justify-center overflow-visible shadow-inner" style={{ maxWidth: 650 }}>
        <div className="absolute inset-x-6 top-1/2 -translate-y-1/2 h-1.5 bg-white/90 rounded-full" />
        <motion.div
          className="w-[110px] sm:w-[150px] md:w-[170px] relative z-2"
          animate={carMoved ? { x: 120, scale: 0.46, opacity: 0 } : { x: 0, scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 160, damping: 18, duration: 0.7 }}
        >
          <CarSVG color={byNum ? "#e9edf5" : goal.c} num={byNum ? goal.num : ""} />
        </motion.div>
      </div>

      {/* Garages */}
      <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-[650px] mx-auto">
        {garages.map((g) => (
          <button
            key={g.name}
            onClick={() => handlePark(g)}
            className={`rounded-[22px] p-2 shadow-[0_4px_0_rgba(223,228,245,0.9)] transition ${parked && g.name === goal.name ? "bg-[#d6f6df] shadow-[0_4px_0_#b3e7c2] scale-[0.98]" : "bg-[#f3f5ff] hover:scale-[1.03]"}`}
          >
            <GarageSVG color={g.c} num={g.num} />
          </button>
        ))}
      </div>
    </div>
  )
}
