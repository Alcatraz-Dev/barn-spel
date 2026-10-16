import { useEffect, useState, useMemo } from "react"

const shadows = [
  { e: "🐘", n: "elefanten" }, { e: "🐱", n: "katten" }, { e: "🐶", n: "hunden" }, { e: "🐸", n: "grodan" },
  { e: "🐌", n: "snigeln" }, { e: "🐙", n: "bläckfisken" }, { e: "🐰", n: "kaninen" }, { e: "🐓", n: "tuppen" },
  { e: "🐧", n: "pingvinen" }, { e: "🐵", n: "apan" }, { e: "🐺", n: "vargen" }, { e: "🐮", n: "kon" },
  { e: "🐯", n: "tigern" }, { e: "🐷", n: "grisen" }
];

export default function ShadowGame({ level, qIndex, onCorrect, onWrong, speak, locked }) {
  const [target, setTarget] = useState(shadows[0])
  const [picked, setPicked] = useState(null)

  useEffect(() => {
    const t = shadows[Math.floor(Math.random() * shadows.length)]
    setTarget(t)
    setPicked(null)
    speak("Vilken skugga hör till " + t.n + "?")
  }, [level, qIndex || 0, speak])

  const choices = useMemo(() => {
    const others = shadows.filter(s => s.n !== target.n)
    const count = level <= 3 ? 4 : 6
    const shuffled = [...others].sort(() => Math.random() - 0.5)
    const opts = [target, ...shuffled.slice(0, Math.max(1, count - 1))]
    return opts.sort(() => Math.random() - 0.5)
  }, [target, level])

  return (
    <div className="text-center">
      <p className="text-xl font-extrabold text-[#4d46c8] mb-2">🌑 Hitta skuggan</p>
      <p className="text-base font-extrabold text-slate-600">Vilken skugga hör till <span className="text-[#6c63ff]">{target.n}</span>?</p>
      <div className="mt-4 text-7xl sm:text-8xl drop-shadow-sm">{target.e}</div>
      <p className="text-sm text-slate-500 mt-1">Klicka på rätt silhuett!</p>
      <div className="mt-5 grid grid-cols-3 sm:grid-cols-4 gap-3 max-w-[640px] mx-auto">
        {choices.map(s => {
          const isCorrect = s.n === target.n
          const isPicked = picked === s.n
          return (
            <button
              key={s.n + s.e}
              onClick={() => {
                if (locked) return
                setPicked(s.n)
                if (isCorrect) onCorrect("Ja! Det är skuggan till " + target.n + "! 🌟")
                else onWrong("Titta på formen igen.")
              }}
              className={`rounded-[22px] bg-[#f3f5ff] p-3 shadow-[0_4px_0_rgba(223,228,245,0.9)] flex flex-col items-center gap-1 active:scale-[0.98] transition ${isPicked ? (isCorrect ? "ring-4 ring-emerald-400 bg-emerald-50" : "ring-4 ring-rose-300 bg-rose-50") : "hover:brightness-95"}`}
            >
              <span className={`text-4xl sm:text-5xl ${isCorrect && isPicked ? "brightness-110 scale-110" : "brightness-0 opacity-80"}`}>{s.e}</span>
              <span className="text-xs font-extrabold text-slate-500">{s.n}</span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
