import { useEffect, useState } from "react"
import { letters } from "../data/games"

export default function LettersGame({ level, qIndex, onCorrect, onWrong, speak, locked }) {
  const [t, setT] = useState(letters[0])
  const [opts, setOpts] = useState([])

  useEffect(() => {
    const target = letters[Math.floor(Math.random() * letters.length)]
    setT(target)
    const others = letters.filter(l => l.l !== target.l)
    const shuffled = [...others].sort(() => Math.random() - 0.5)
    const pool = [target, ...shuffled.slice(0, 5)]
    setOpts(pool.sort(() => Math.random() - 0.5))
    speak(target.w + " börjar med vilken bokstav?")
  }, [level, qIndex || 0, speak])
  return (
    <div className="text-center">
      <p className="text-xl font-extrabold text-slate-700 mb-1">{t.e} {t.w} börjar med vilken bokstav?</p>
      <div className="mt-4 flex flex-wrap justify-center gap-3 max-w-[360px] mx-auto">
        {opts.map(item => (
          <button key={item.l} onClick={() => { if (locked) return; if (item.l === t.l) onCorrect("Ja! " + t.w + " börjar med " + item.l + ". ⭐"); else onWrong("Lyssna på första ljudet."); }}
            className="rounded-2xl bg-[#f3f5ff] p-3 shadow-[0_4px_0_rgba(223,228,245,0.9)] font-extrabold text-3xl min-w-[3.5rem] active:scale-[0.98] transition hover:brightness-95">{item.l}</button>
        ))}
      </div>
    </div>
  )
}
