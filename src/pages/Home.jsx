import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import Screen from "../components/Screen"
import HUD from "../components/HUD"
import QRModal from "../components/QRModal"
import { GAMES, GAME_ORDER } from "../data/games"
import { useAppStore } from "../store/useAppStore"
import { useVoice } from "../hooks/useVoice"

export default function Home({ onStartGame, onOpenSettings, onOpenParent }) {
  const highestLevel = useAppStore(s => s.highestLevel)
  const gameStars = useAppStore(s => s.gameStars)
  const childName = useAppStore(s => s.childName)
  const { speak } = useVoice()
  const [qrOpen, setQrOpen] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => speak(`Hej ${childName}! Välj ett spel och samla stjärnor.`), 400)
    return () => clearTimeout(t)
  }, [childName, speak])

  return (
    <Screen className="mx-auto max-w-[1100px] px-4 sm:px-6 lg:px-8 py-5 sm:py-8">
      <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-5">
        <div className="flex items-center gap-3">
          <div className="text-5xl sm:text-6xl">🦁</div>
          <div>
            <h1 className="text-2xl sm:text-4xl font-extrabold text-primary">Djurkompisarna</h1>
            <p className="text-sm sm:text-base text-slate-600">Lär och lek • för barn 4–6 år</p>
          </div>
        </div>
        <HUD onOpenParent={onOpenParent} onOpenQR={() => setQrOpen(true)} />
      </header>

      <section className="relative overflow-hidden rounded-[32px] px-5 sm:px-8 py-6 sm:py-8 mb-6 shadow-[0_8px_0_rgba(220,226,244,0.9)] bg-gradient-to-br from-sky/60 via-vio/60 to-honey/60">
        <div className="relative z-10 flex items-center justify-between gap-4">
          <div>
            <h2 className="text-xl sm:text-3xl font-extrabold mb-1">Hej lilla upptäckare! 🌈</h2>
            <p className="text-sm sm:text-lg text-slate-700 leading-relaxed">Välj ett spel, klara nivåerna och samla stjärnor.<br />Du klarar det – prova igen!</p>
          </div>
          <div className="text-6xl sm:text-8xl hidden md:block">🐰</div>
        </div>
      </section>

      <h2 className="text-xl sm:text-2xl font-extrabold mb-3">Vad vill du leka?</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4">
        {GAME_ORDER.map((id, idx) => {
          const g = GAMES[id]
          const h = highestLevel(id)
          const s = gameStars(id)
          return (
            <motion.button
              key={id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.04 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onStartGame(id)}
              className={`rounded-[26px] min-h-[150px] p-5 text-left shadow-[0_7px_0_rgba(50,70,110,0.14)] flex flex-col gap-1.5 ${g.color} active:scale-[0.98]`}
            >
              <span className="text-4xl">{g.emoji}</span>
              <strong className="text-xl font-extrabold">{g.name}</strong>
              <span className="text-sm text-slate-700">{g.sub}</span>
              <span className="mt-1 inline-flex w-fit rounded-full bg-white/80 px-2.5 py-0.5 text-xs font-extrabold text-slate-700">
                {h === 0 ? "Börja spela!" : `Nivå ${h} • ⭐ ${s}`}
              </span>
            </motion.button>
          )
        })}
      </div>

      <footer className="mt-10 text-center text-sm text-slate-500">
        <p>Du får gärna ta pauser. Det viktigaste är att ha roligt! 💛</p>
        <p>
          <a
            onClick={() => setQrOpen(true)}
            style={{color:"#6c63ff", textDecoration:"none"}}
          >📱 Öppna på telefonen (QR-kod)</a>
        </p>
        <p className="mt-1 opacity-70 text-xs">v2 · Röst: Bella</p>
      </footer>

      <QRModal open={qrOpen} onClose={() => setQrOpen(false)} />
    </Screen>
  )
}
