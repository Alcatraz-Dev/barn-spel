import { ArrowLeft } from "lucide-react"
import Screen from "../components/Screen"
import { GAMES, STAGES, MAX_LEVEL } from "../data/games"
import { useAppStore } from "../store/useAppStore"
export default function Levels({ gameId, onBack, onPlay }) {
  const g = GAMES[gameId]
  const starsFor = useAppStore(s => s.starsFor)
  const isUnlocked = useAppStore(s => s.isUnlocked)
  return (
    <Screen className="mx-auto max-w-[1000px] px-4 sm:px-6 lg:px-8 py-5">
      <button onClick={onBack} className="inline-flex items-center gap-2 rounded-2xl bg-white px-4 py-2.5 font-extrabold shadow-[0_4px_0_rgba(220,226,244,0.9)] active:scale-[0.98] mb-4"><ArrowLeft size={18}/>Till startsidan</button>
      <div className="rounded-[30px] bg-white p-5 sm:p-8 shadow-[0_8px_0_rgba(224,229,243,0.9)]">
        <div className="text-center"><div className="text-5xl sm:text-6xl">{g.emoji}</div><h2 className="text-2xl sm:text-3xl font-extrabold mt-1">{g.name}</h2><p className="mt-1 text-slate-600">Klara en nivå för att låsa upp nästa. Samla stjärnor! ⭐</p></div>
        <div className="mt-6 space-y-5">{STAGES.map(st=>(
          <div key={st.name}><div className="text-sm font-extrabold text-primary mb-2">{st.emoji} {st.name} ({st.from}–{st.to})</div><div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-10 gap-2">{Array.from({length:MAX_LEVEL},(_,i)=>i+1).filter(l=>l>=st.from&&l<=st.to).map(l=>{const unlocked=isUnlocked(gameId,l);const s=starsFor(gameId,l);return <button key={l} onClick={()=>unlocked&&onPlay(gameId,l)} className={["flex flex-col items-center gap-1 rounded-2xl px-2 py-2.5 shadow-[0_4px_0_rgba(223,228,245,0.9)]",unlocked?"bg-white/95":"bg-slate-100 text-slate-400"].join(" ")}>{unlocked?l:"🔒"}<span className="text-[10px] tracking-widest">{unlocked?"⭐".repeat(s)+"☆".repeat(3-s):""}</span></button>})}</div></div>
        ))}</div>
      </div>
    </Screen>
  )
}
