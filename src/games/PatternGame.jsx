import { useEffect, useState } from "react"
import { patterns as allPatterns } from "../data/games"
export default function PatternGame({ level, qIndex, onCorrect, onWrong, speak, locked }) {
  const [p, setP] = useState(allPatterns[0])
  useEffect(() => { const target = allPatterns[Math.floor(Math.random() * allPatterns.length)]; setP(target); speak("Vad kommer härnäst?"); }, [level, qIndex || 0, speak])
  return (
    <div className="text-center">
      <p className="text-xl font-extrabold text-slate-700 mb-1">Vad kommer härnäst?</p>
      <div style={{fontSize:"clamp(2.3rem,7vw,4rem)",letterSpacing:".1em",margin:"20px 0"}}>{p.seq.join(" ")} <span style={{color:"#6c63ff"}}>?</span></div>
      <div className="mt-5 flex justify-center gap-3 max-w-[360px] mx-auto">
        {p.opts.map(x => (
          <button key={x} onClick={() => { if (locked) return; if (x === p.answer) onCorrect("Bra! 🌟"); else onWrong("Titta på mönstret."); }}
            className="rounded-2xl bg-[#f3f5ff] p-3 shadow-[0_4px_0_rgba(223,228,245,0.9)] text-3xl min-w-[3.5rem] active:scale-[0.98] transition hover:brightness-95">{x}</button>
        ))}
      </div>
    </div>
  )
}
