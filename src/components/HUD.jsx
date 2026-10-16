import { Volume2, VolumeX, Settings, UserRound } from "lucide-react"
import { useAppStore } from "../store/useAppStore"
export default function HUD({ onOpenSettings, onOpenParent, onOpenQR }) {
  const voiceOn = useAppStore(s => s.voiceOn)
  const toggleVoice = useAppStore(s => s.toggleVoice)
  const totalStars = useAppStore(s => s.totalStars)

  return (
    <div className="flex items-center gap-2 flex-wrap">
      <span className="inline-flex items-center gap-1.5 rounded-full bg-white px-3.5 py-2 shadow-[0_4px_0_rgba(217,222,244,0.9)] text-base font-extrabold">⭐ {totalStars()}</span>
      <button onClick={toggleVoice} className="inline-flex items-center gap-1.5 rounded-full bg-white px-3.5 py-2 shadow-[0_4px_0_rgba(217,222,244,0.9)] text-base font-extrabold active:scale-[0.98]">
        {voiceOn ? <Volume2 size={18} /> : <VolumeX size={18} />}
        {voiceOn ? "Röst på" : "Röst av"}
      </button>
      <button onClick={onOpenSettings} className="inline-flex items-center gap-1.5 rounded-full bg-white px-3.5 py-2 shadow-[0_4px_0_rgba(217,222,244,0.9)] text-base font-extrabold active:scale-[0.98]">
        <Settings size={18}/>Inställningar
      </button>
      <button onClick={onOpenParent} className="inline-flex items-center gap-1.5 rounded-full bg-white px-3.5 py-2 shadow-[0_4px_0_rgba(217,222,244,0.9)] text-base font-extrabold active:scale-[0.98]">
        <UserRound size={18}/>Föräldrar
      </button>
      <button onClick={onOpenQR} className="inline-flex items-center gap-1.5 rounded-full bg-white px-3.5 py-2 shadow-[0_4px_0_rgba(217,222,244,0.9)] text-base font-extrabold active:scale-[0.98]">
        <span className="text-lg leading-none">📲</span>QR
      </button>
    </div>
  )
}