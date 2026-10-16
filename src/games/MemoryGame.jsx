import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"

export default function MemoryGame({ level, onCorrect, onWrong, speak, locked, qIndex }) {
  const items = ["🐱", "🐶", "🐸", "🐻", "🐹", "🐰"]
  const [deck, setDeck] = useState([])
  const [open, setOpen] = useState([])
  const [found, setFound] = useState([])
  const [moves, setMoves] = useState(0)

  useEffect(() => {
    const pairCount = level <= 3 ? 4 : 5
    const pick = items.slice(0, pairCount)
    const d = pick.flatMap(e => ([
      { id: e, emoji: e, matched: false },
      { id: e, emoji: e, matched: false }
    ])).map((c, i) => ({ ...c, idx: i }))
    // shuffle
    for (let i = d.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[d[i], d[j]] = [d[j], d[i]]
    }
    setDeck(d)
    setOpen([])
    setFound([])
    setMoves(0)
    speak("Hitta två likadana!")
  }, [level, qIndex || 0, speak])

  function flip(idx) {
    if (locked || open.includes(idx) || found.includes(idx) || open.length >= 2) return
    const newOpen = [...open, idx]
    setOpen(newOpen)
    if (newOpen.length === 2) {
      setMoves(m => m + 1)
      const [a, b] = newOpen
      const cardA = deck.find(c => c.idx === a)
      const cardB = deck.find(c => c.idx === b)
      if (cardA && cardB && cardA.id === cardB.id) {
        setTimeout(() => {
          setFound(prev => [...prev, a, b])
          setOpen([])
          if (found.length + 2 >= deck.length) {
            setTimeout(() => onCorrect("Alla par hittade! Bra jobbat! ⭐"), 500)
          } else {
            onCorrect("Ett par! 🌟")
          }
        }, 400)
      } else {
        setTimeout(() => setOpen([]), 700)
      }
    }
  }

  return (
    <div className="text-center">
      <h3 className="text-xl font-extrabold text-slate-800">Memory – hitta par!</h3>
      <div className="mt-4 grid grid-cols-4 gap-2 max-w-[420px] mx-auto">
        {deck.map(c => {
          const show = open.includes(c.idx) || found.includes(c.idx)
          return (
            <motion.button
              key={c.idx}
              whileTap={{ scale: 0.95 }}
              onClick={() => flip(c.idx)}
              className={`h-20 rounded-2xl shadow-[0_4px_0_#c3bdf5] flex items-center justify-center text-4xl active:brightness-95 transition ${show ? "bg-[#d6f6df]" : "bg-[#dcd8ff]"}`}
            >
              <AnimatePresence>
                {show ? (
                  <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }} transition={{ duration: 0.2 }} className="text-4xl">{c.emoji}</motion.span>
                ) : (
                  <span>❓</span>
                )}
              </AnimatePresence>
            </motion.button>
          )
        })}
      </div>
      <p className="mt-3 text-sm text-slate-600">Par hittade: {found.length / 2} / {deck.length / 2}</p>
    </div>
  )
}
