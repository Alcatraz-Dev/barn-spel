import { create } from "zustand"
import { persist } from "zustand/middleware"

export const useAppStore = create(
  persist(
    (set, get) => ({
      progress: {},
      voiceOn: true,
      childName: "Elias",
      starsFor: (g, l) => get().progress[g]?.[l] || 0,
      isUnlocked: (g, l) => l <= 1 || get().starsFor(g, l - 1) > 0,
      gameStars: (g) => {
        let t = 0
        const p = get().progress[g] || {}
        for (const k in p) t += p[k]
        return t
      },
      highestLevel: (g) => {
        let h = 0
        for (let l = 1; l <= 10; l++) {
          if (get().starsFor(g, l) > 0) h = l
        }
        return h
      },
      totalStars: () => {
        let t = 0
        const p = get().progress
        for (const g in p) {
          for (const l in p[g]) t += p[g][l]
        }
        return t
      },
      setStars: (g, l, n) => set(s => {
        const cur = s.progress[g]?.[l] || 0
        const nextv = Math.max(cur, n)
        return {
          progress: {
            ...s.progress,
            [g]: {
              ...(s.progress[g] || {}),
              [l]: nextv
            }
          }
        }
      }),
      toggleVoice: () => set(s => ({ voiceOn: !s.voiceOn })),
      setChildName: (name) => set({ childName: (name || '').trim() || 'Elias' }),
      resetProgress: () => set({ progress: {} })
    }),
    { name: "djurkompisarna-v2.1.2" }
  )
)
