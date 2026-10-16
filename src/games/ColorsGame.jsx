import { useEffect, useState } from "react"
import { colorData } from "../data/games"

export default function ColorsGame({ level, qIndex, onCorrect, onWrong, speak, locked }) {
  const [t, setT] = useState(colorData[0])
  const [opts, setOpts] = useState([])

  useEffect(() => {
    const target = colorData[Math.floor(Math.random() * colorData.length)]
    setT(target)
    // random 9 picks with target included
    const others = colorData.filter(c => c.n !== target.n)
    const shuffled = [...others].sort(() => Math.random() - 0.5)
    const pool = [target, ...shuffled.slice(0, 8)]
    setOpts(pool.sort(() => Math.random() - 0.5))
    speak("Hitta den " + target.n + " färgen!")
  }, [level, qIndex || 0, speak])

  return (
    <div className="text-center">
      <p className="text-xl font-extrabold text-slate-700 mb-3">
        Hitta <span style={{ color: "#9333ea", fontWeight: "900" }}>den {t.n} färgen!</span>
      </p>
      <div className="mt-4 grid grid-cols-3 sm:grid-cols-4 gap-3 max-w-[520px] mx-auto">
        {opts.map(c => (
          <button
            key={c.n + Math.random()}
            onClick={() => {
              if (locked) return
              if (c.n === t.n) onCorrect("Ja! Det är " + c.n + ". ⭐")
              else onWrong("Titta på färgen.")
            }}
            className={`rounded-2xl p-4 shadow-[0_4px_0_rgba(223,228,245,0.9)] flex flex-col items-center gap-2 active:scale-[0.98] transition hover:scale-[1.02] ${c.n === t.n ? "ring-4 ring-emerald-400 bg-emerald-50" : "bg-[#f3f5ff]"}`}
          >
            <span className={`text-4xl sm:text-5xl transition ${c.n === t.n ? "scale-110" : ""}`}>{c.e}</span>
            <span className={`text-xs font-extrabold ${c.n === t.n ? "text-emerald-700" : "text-slate-600"}`}>{c.n}</span>
          </button>
        ))}
      </div>
    </div>
  )
}
