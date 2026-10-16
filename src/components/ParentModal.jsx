import { useState, useEffect } from "react"
import Modal from "./Modal"
import { useAppStore } from "../store/useAppStore"

export default function ParentModal({ open, onClose }) {
  const childName = useAppStore(s => s.childName)
  const setChildName = useAppStore(s => s.setChildName)
  const resetProgress = useAppStore(s => s.resetProgress)
  const totalStars = useAppStore(s => s.totalStars)
  const [name, setName] = useState(childName)
  const [confirm, setConfirm] = useState(false)

  useEffect(() => {
    if (open) {
      setName(childName)
      setConfirm(false)
    }
  }, [open, childName])

  return (
    <Modal open={open} onClose={onClose}>
      <div className="p-6 sm:p-8">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-primary">Föräldravy</h2>
        <p className="mt-2 text-sm text-slate-600">Byt barnets namn eller återställ alla stjärnor.</p>

        <div className="mt-4">
          <label className="text-xs text-slate-600">Barnets namn</label>
          <div className="mt-1 flex flex-col sm:flex-row gap-2">
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full rounded-2xl border-2 border-[#dfe4f5] px-4 py-2.5 text-base"
              maxLength={16}
            />
            <button
              onClick={() => setChildName(name)}
              className="rounded-2xl bg-primary px-5 py-2.5 text-white font-extrabold shadow-[0_5px_0_rgba(73,66,189,0.9)] active:scale-[0.98]"
            >
              Spara namn
            </button>
          </div>
        </div>

        <div className="mt-4 rounded-2xl border border-[#eef1fb] bg-[#f8f9ff] p-4">
          <p className="text-xs text-slate-500">Samlade stjärnor</p>
          <p className="mt-1 text-xl font-extrabold">⭐ {totalStars()}</p>
        </div>

        <div className="mt-4">
          {!confirm ? (
            <button
              onClick={() => setConfirm(true)}
              className="rounded-2xl bg-white px-5 py-2.5 font-extrabold shadow-[0_4px_0_rgba(220,226,244,0.9)] active:scale-[0.98]"
            >
              Återställ alla stjärnor
            </button>
          ) : (
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => { resetProgress(); setConfirm(false) }}
                className="rounded-2xl bg-rose-500 px-5 py-2.5 text-white font-extrabold shadow-[0_5px_0_rgba(190,18,60,0.8)] active:scale-[0.98]"
              >
                Ja, återställ allt
              </button>
              <button
                onClick={() => setConfirm(false)}
                className="rounded-2xl bg-white px-5 py-2.5 font-extrabold shadow-[0_4px_0_rgba(220,226,244,0.9)] active:scale-[0.98]"
              >
                Avbryt
              </button>
            </div>
          )}
        </div>

        <div className="mt-6 flex justify-end">
          <button
            onClick={onClose}
            className="rounded-2xl bg-white px-5 py-2.5 font-extrabold shadow-[0_4px_0_rgba(220,226,244,0.9)] active:scale-[0.98]"
          >
            Stäng
          </button>
        </div>
      </div>
    </Modal>
  )
}
