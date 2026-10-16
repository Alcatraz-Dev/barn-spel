import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

export function shuffle(arr) {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

export function pickDistinct(pool, exclude, count) {
  const candidates = pool.filter(x => x !== exclude)
  const shuffled = shuffle(candidates)
  return shuffled.slice(0, Math.max(0, count))
}

export function starsFromMistakes(mistakes) {
  if (mistakes <= 0) return 3
  if (mistakes <= 2) return 2
  return 1
}

export function haptic(light = true) {
  try {
    if (typeof navigator !== "undefined" && navigator.vibrate) {
      navigator.vibrate(light ? [12] : [18, 10, 16])
    }
  } catch (e) {
    // ignore
  }
}
