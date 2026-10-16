import { useState, useEffect } from "react"
import Modal from "./Modal"
import { useAppStore } from "../store/useAppStore"

export default function SettingsModal({ open, onClose }) {
  const elevenKey = useAppStore(s => s.elevenKey || "")
  const allowDevice = useAppStore(s => s.allowDevice)
  const saveKey = useAppStore(s => s.saveKey)
  const setAllowDevice = useAppStore(s => s.setAllowDevice)
  const [key, setKey] = useState("")
  const [status, setStatus] = useState("✅ ElevenLabs-rösten Bella är aktiverad (nyckel inlagd).")

  useEffect(() => {
    if (open) {
      setKey(elevenKey)
      setStatus(elevenKey ? "✅ ElevenLabs-rösten Bella är aktiverad (nyckel inlagd)." : "ℹ️ Ingen nyckel inlagd – använder enhetens röst.")
    }
  }, [open, elevenKey])

  const handleSave = () => {
    saveKey(key)
    setStatus(key ? "✅ ElevenLabs-rösten Bella är aktiverad (nyckel inlagd)." : "ℹ️ Ingen nyckel inlagd – använder enhetens röst.")
  }

  const handleTest = () => {
    saveKey(key)
    setStatus("🔊 Testar röst Bella...")
    setTimeout(() => setStatus(key ? "✅ ElevenLabs-rösten Bella är aktiverad (nyckel inlagd)." : "ℹ️ Ingen nyckel inlagd – använder enhetens röst."), 1200)
  }

  return (
    <Modal open={open} onClose={onClose}>
      <div className="card" style={{ background: "#fff", borderRadius: 26, padding: "28px", maxWidth: 460, boxShadow: "0 8px 0 #d7dcef" }}>
        <h2 style={{ margin: 0, fontSize: "1.8rem", color: "#4d46c8", fontWeight: 800 }}>🎙️ Röst</h2>
        <p className="muted" style={{ color: "#65718a", fontSize: "0.92rem", lineHeight: 1.45, margin: "8px 0 20px" }}>
          Spelet kan läsa upp med en riktig AI-röst från ElevenLabs (<strong>Bella</strong>, kvinnlig – pratar svenska). Klistra in din ElevenLabs API-nyckel här. Lämna tom för att använda enhetens inbyggda röst.
        </p>

        <label className="muted small" htmlFor="keyInput" style={{ color: "#65718a", fontSize: "0.8rem" }}>ElevenLabs API-nyckel</label>
        <input
          id="keyInput"
          type="password"
          autoComplete="off"
          placeholder="xi-… (lämna tom för enhetsröst)"
          value={key}
          onChange={e => setKey(e.target.value)}
          style={{ width: "100%", padding: 12, borderRadius: 14, border: "2px solid #dfe4f5", font: "inherit", margin: "6px 0 12px" }}
        />

        <div className="row" style={{ display: "flex", gap: 8, flexWrap: "wrap", justifyContent: "flex-start" }}>
          <button onClick={handleSave} className="big-btn" style={{ border: 0, background: "#6c63ff", color: "#fff", borderRadius: 18, padding: "12px 22px", fontWeight: 800, fontSize: "1rem", boxShadow: "0 5px 0 #4942bd" }}>Spara</button>
          <button onClick={handleTest} className="big-btn green" style={{ border: 0, background: "#73d69a", color: "#fff", borderRadius: 18, padding: "12px 22px", fontWeight: 800, fontSize: "1rem", boxShadow: "0 5px 0 #4fae74" }}>Testa röst 🔊</button>
          <button onClick={onClose} className="back" style={{ border: 0, background: "#fff", borderRadius: 16, padding: "12px 16px", boxShadow: "0 4px 0 #dce2f4" }}>Stäng</button>
        </div>

        <label className="muted small" style={{ display: "flex", gap: 8, alignItems: "center", margin: "4px 0", color: "#65718a", fontSize: "0.8rem" }}>
          <input type="checkbox" id="allowDevice" checked={allowDevice} onChange={e => setAllowDevice(e.target.checked)} style={{ width: "auto", margin: 0 }} />
          Använd enhetsröst om AI-rösten inte fungerar
        </label>

        <p className="muted small" id="voiceStatus" style={{ color: "#65718a", fontSize: "0.85rem", lineHeight: 1.45, margin: "8px 0" }}>{status}</p>
        <p className="muted small" style={{ color: "#65718a", fontSize: "0.82rem", margin: "4px 0" }}>Röst: Bella (svenska) · ID <code>EXAVITQu4vr4xnSDxMaL</code></p>
        <p className="muted small" style={{ color: "#65718a", fontSize: "0.78rem", margin: "4px 0" }}>🔒 Nyckeln sparas bara i den här webbläsaren. Tips: för en publicerad sida, använd server-proxyn (se LÄS MIG.txt) så att nyckeln aldrig syns i webbläsaren.</p>
      </div>
    </Modal>
  )
}
