import { useEffect, useState } from "react"
export default function CountGame({ level, qIndex, onCorrect, onWrong, speak, locked }) {
  const [n, setN] = useState(3)
  const [emoji, setEmoji] = useState("🍎")
  useEffect(() => {
    const max = level <= 3 ? 5 : 10
    const num = 1 + Math.floor(Math.random() * max)
    const em = ["🍎","⭐","🐟","🦋","🎈"][Math.floor(Math.random()*5)]
    setN(num); setEmoji(em)
    speak("Hur många?")
  }, [level, qIndex || 0, speak])
  const opts = [n, Math.max(1, n-2), Math.min(n+3, 12)].sort(() => Math.random()-0.5)
  return (
    <div className="text-center">
      <p className="text-lg font-extrabold text-slate-700">Hur många ser du?</p>
      <div className="mt-4 flex flex-wrap justify-center gap-1.5 text-4xl sm:text-6xl leading-tight">{Array.from({length:n}).map((_,i)=><span key={i}>{emoji}</span>)}</div>
      <div className="mt-5 grid grid-cols-3 gap-3 max-w-[400px] mx-auto">
        {opts.map(x => (
          <button key={x} onClick={() => { if (locked) return; if (x === n) onCorrect("Rätt! " + n); else onWrong("Räkna igen."); }}
            className="rounded-2xl bg-[#f3f5ff] p-4 shadow-[0_4px_0_rgba(223,228,245,0.9)] font-extrabold text-2xl active:scale-[0.98]">{x}</button>
        ))}
      </div>
    </div>
  )
}
