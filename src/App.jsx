import { useState } from "react"
import { AnimatePresence } from "framer-motion"
import { Toaster } from "sonner"
import Home from "./pages/Home"
import Levels from "./pages/Levels"
import GamePlay from "./pages/GamePlay"
import SettingsModal from "./components/SettingsModal"
import ParentModal from "./components/ParentModal"
import SplashScreen from "./components/SplashScreen"

export default function App() {
  const [showSplash, setShowSplash] = useState(true)
  const [view, setView] = useState("home")
  const [gameId, setGameId] = useState(null)
  const [level, setLevel] = useState(1)
  const [settingsOpen, setSettingsOpen] = useState(false)
  const [parentOpen, setParentOpen] = useState(false)

  function goHome() {
    setView("home")
    setGameId(null)
  }
  function goLevels(id) {
    setGameId(id)
    setLevel(1)
    setView("levels")
  }
  function play(id, l) {
    setGameId(id)
    setLevel(l)
    setView("play")
  }
  function nextLevel(id, l) {
    setGameId(id)
    setLevel(l)
    setView("play")
  }

  if (showSplash) {
    return <SplashScreen onDone={() => setShowSplash(false)} />
  }

  return (
    <div className="min-h-dvh">
      <AnimatePresence mode="wait">
        {view === "home" && (
          <Home
            key="home"
            onStartGame={goLevels}
            onOpenSettings={() => setSettingsOpen(true)}
            onOpenParent={() => setParentOpen(true)}
          />
        )}
        {view === "levels" && gameId && (
          <Levels key={"levels-" + gameId} gameId={gameId} onBack={goHome} onPlay={play} />
        )}
        {view === "play" && gameId && (
          <GamePlay key={"play-" + gameId + "-" + level} gameId={gameId} level={level} onBackLevels={goLevels} onBackHome={goHome} onNextLevel={nextLevel} />
        )}
      </AnimatePresence>

      <SettingsModal open={settingsOpen} onClose={() => setSettingsOpen(false)} />
      <ParentModal open={parentOpen} onClose={() => setParentOpen(false)} />
      <Toaster position="top-center" richColors theme="light" toastOptions={{ className: "font-extrabold" }} />
    </div>
  )
}
