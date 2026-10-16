import { useState, useEffect, useCallback, useRef } from "react"
import { ArrowLeft } from "lucide-react"
import Screen from "../components/Screen"
import { GAMES, QUESTIONS, MAX_LEVEL } from "../data/games"
import { useAppStore } from "../store/useAppStore"
import { useVoice } from "../hooks/useVoice"
import { starsFromMistakes, haptic } from "../lib/utils"
import AnimalGame from "../games/AnimalGame"
import MemoryGame from "../games/MemoryGame"
import ColorsGame from "../games/ColorsGame"
import CountGame from "../games/CountGame"
import LettersGame from "../games/LettersGame"
import PatternGame from "../games/PatternGame"
import GarageGame from "../games/GarageGame"
import ShadowGame from "../games/ShadowGame"
import DoneModal from "../components/DoneModal"
import { toast } from "sonner"

const MAP = {
  animal: AnimalGame,
  memory: MemoryGame,
  colors: ColorsGame,
  count: CountGame,
  letters: LettersGame,
  puzzle: PatternGame,
  garage: GarageGame,
  shadow: ShadowGame
}

export default function GamePlay({ gameId, level, onBackLevels, onBackHome, onNextLevel }) {
  const g = GAMES[gameId]
  const setStars = useAppStore(s => s.setStars)
  const isUnlocked = useAppStore(s => s.isUnlocked)
  const totalStars = useAppStore(s => s.totalStars)
  const { speak, stop, warm } = useVoice()
  const [q, setQ] = useState(0)
  const [score, setScore] = useState(0)
  const [mistakes, setMistakes] = useState(0)
  const [locked, setLocked] = useState(false)
  const [done, setDone] = useState(false)
  const [stars, setStarsLocal] = useState(3)
  const [resetKey, setResetKey] = useState(0)
  const nextTimer = useRef(null)

  useEffect(() => {
    warm?.()
    const t = setTimeout(() => speak(g.name + ". Nivå " + level + "."), 300)
    return () => { stop(); if (nextTimer.current) clearTimeout(nextTimer.current); clearTimeout(t) }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gameId, level])

  const finish = useCallback(() => {
    const st = starsFromMistakes(mistakes)
    setStarsLocal(st)
    setStars(gameId, level, st)
    setDone(true)
    const happy = st === 3 ? "Fantastiskt! Perfekt! Alla rätt! ⭐⭐⭐" : st === 2 ? "Snyggt jobbat! Du är grym! ⭐⭐" : "Bra kämpat! Du klarade nivån! ⭐"
    speak(happy)
  }, [mistakes, gameId, level, setStars, speak])

  const onCorrect = useCallback((msg) => {
    const positive = [
      "Fantastiskt! 🌟", "Bra jobbat! ⭐", "Du är grym! 💪",
      "Snyggt! 🎉", "Så duktig! 🌈", "Perfekt! 🏆"
    ]
    const text = msg || positive[Math.floor(Math.random() * positive.length)]
    if (locked) return
    haptic(true)
    setLocked(true)
    setScore(s => s + 1)
    speak(text)
    nextTimer.current = setTimeout(() => {
      setQ(prev => {
        const nq = prev + 1
        if (nq >= QUESTIONS) {
          finish()
          return nq
        }
        setLocked(false)
        return nq
      })
    }, 1800)
  }, [locked, speak, finish])

  const onWrong = useCallback((msg) => {
    if (locked) return
    haptic(false)
    setMistakes(m => m + 1)
    const msgText = msg || "Nästan! Du klarar det! 💛"
    toast(msgText, { duration: 1400 })
    speak(msgText)
  }, [locked, speak])

  const Comp = MAP[gameId]
  const progress = Math.min(100, ((q) / QUESTIONS) * 100)

  return (
    <Screen className="mx-auto max-w-[1000px] px-4 sm:px-6 lg:px-8 py-5">
      <div className="flex items-center justify-between mb-4">
        <button onClick={() => { stop(); onBackLevels(gameId) }} className="inline-flex items-center gap-2 rounded-2xl bg-white px-4 py-2.5 font-extrabold shadow-[0_4px_0_rgba(220,226,244,0.9)] active:scale-[0.98]">
          <ArrowLeft size={18} /> Till nivåer
        </button>
        <div className="text-sm font-extrabold text-slate-600">Nivå {level} • Rätt: {score} av {QUESTIONS}</div>
      </div>
      <div className="rounded-[30px] bg-white p-5 sm:p-8 shadow-[0_8px_0_rgba(224,229,243,0.9)]">
        <div className="text-center"><div className="text-4xl sm:text-5xl">{g.emoji}</div><h2 className="text-xl sm:text-2xl font-extrabold mt-1">{g.name} – Nivå {level}</h2></div>
        <div className="mt-5">{Comp && <Comp key={resetKey + ":" + level + ":" + q} level={level} qIndex={q} locked={locked} onCorrect={onCorrect} onWrong={onWrong} speak={speak} />}</div>
        <div className="mx-auto mt-5 max-w-[480px] h-3 rounded-full bg-[#edf0fb] overflow-hidden shadow-inner"><div className="h-full bg-gradient-to-r from-emerald-300 to-emerald-400 transition-[width] duration-300" style={{ width: progress + "%" }} /></div>
        <p className="mt-2 text-center text-sm text-slate-600">Fråga {Math.min(q + 1, QUESTIONS)} / {QUESTIONS}</p>
      </div>
      {done && <DoneModal open={done} stars={stars} level={level} total={totalStars()} nextUnlocked={level < MAX_LEVEL && isUnlocked(gameId, level + 1)} onNext={() => { setDone(false); if (level < MAX_LEVEL && isUnlocked(gameId, level + 1)) onNextLevel(gameId, level + 1); else onBackLevels(gameId) }} onRetry={() => { setDone(false); setQ(0); setScore(0); setMistakes(0); setLocked(false); setResetKey(k => k+1) }} onLevels={() => onBackLevels(gameId)} />}
    </Screen>
  )
}
