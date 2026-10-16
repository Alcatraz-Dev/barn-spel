import { useEffect, useState } from "react"

export default function QRModal({ open, onClose }) {
  const [url, setUrl] = useState("")

  useEffect(() => {
    if (open) {
      setUrl(typeof window !== "undefined" ? (window.location.origin || "https://min-son-spel.vercel.app/") + "/" : "https://min-son-spel.vercel.app/")
    }
  }, [open])

  if (!open) return null

  const encodedUrl = encodeURIComponent(url)
  const qrImageUrl = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodedUrl}`

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4" onClick={onClose}>
      <div className="bg-white w-full max-w-[520px] rounded-[36px] p-6 sm:p-8 shadow-[0_20px_60px_rgba(108,99,255,0.12),0_8px_0_rgba(220,226,244,0.9)] text-center" onClick={e => e.stopPropagation()}>
        <h1 className="text-3xl sm:text-[2.2rem] font-extrabold text-[#4d46c8] mb-2 tracking-tight">🦁 Djurkompisarna</h1>
        <p className="text-sm sm:text-base text-slate-600 mb-6 leading-snug">Skanna koden med kameran på telefonen eller iPad för att öppna spelet.</p>

        <img
          src={qrImageUrl}
          alt="QR-kod"
          className="mx-auto w-56 h-auto rounded-xl shadow-[0_8px_0_rgba(77,70,200,0.12)] max-w-full"
        />

        <div className="mt-5 flex flex-wrap gap-3 justify-center">
          <button onClick={() => { navigator.clipboard?.writeText(url); alert("Länk kopierad!"); }} className="rounded-[16px] bg-[#f0f0ff] text-[#4d46c8] px-4 py-3 font-extrabold shadow-[0_4px_0_rgba(77,70,200,0.1)]">📋 Kopiera länk</button>
          <button onClick={() => window.print()} className="rounded-[16px] bg-slate-100 text-slate-700 px-4 py-3 font-extrabold shadow-[0_4px_0_rgba(100,100,100,0.1)]">🖨️ Skriv ut</button>
          <button onClick={onClose} className="rounded-[16px] bg-[#6c63ff] text-white px-4 py-3 font-extrabold shadow-[0_4px_0_rgba(77,70,200,0.25)]">← Till spelet</button>
        </div>

        <p className="mt-4 text-xs text-slate-500">Länk som koden öppnar (ändra vid behov):</p>
        <input
          type="text"
          value={url}
          readOnly
          className="w-full rounded-xl px-3 py-2.5 border-2 border-[#dde3fa] bg-white/60 font-semibold text-sm text-slate-700 mt-1 focus:outline-none focus:ring-2 focus:ring-[#6c63ff]"
        />

        <p className="mt-4 text-[#3cc46b] font-extrabold text-sm flex items-center justify-center gap-2">✅ Koden pekar på spelet och kan skannas.</p>

        <div className="mt-5 text-left text-sm text-[#3d426a] leading-relaxed">
          <strong>Så fungerar det:</strong>
          <ol className="pl-5 mt-1 space-y-0.5 list-decimal marker:text-[#6c63ff] marker:font-extrabold">
            <li>Rikta kameran mot koden och tryck på länken.</li>
            <li>I Safari: Dela → Lägg till på hemskärmen.</li>
          </ol>
        </div>
      </div>
    </div>
  )
}
