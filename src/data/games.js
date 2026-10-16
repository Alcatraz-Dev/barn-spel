export const animals = [
  { name: "Katt", emoji: "🐱", sound: "Mjau! Katt." },
  { name: "Hund", emoji: "🐶", sound: "Voff! Hund." },
  { name: "Ko", emoji: "🐮", sound: "Muu! Ko." },
  { name: "Anka", emoji: "🦆", sound: "Kvack! Anka." },
  { name: "Lejon", emoji: "🦁", sound: "Raa! Lejon." },
  { name: "Groda", emoji: "🐸", sound: "Kvack! Groda." },
  { name: "Fisk", emoji: "🐟", sound: "Blubb! Fisk." },
  { name: "Kanin", emoji: "🐰", sound: "Kanin." },
  { name: "Elefant", emoji: "🐘", sound: "Elefant." },
  { name: "Fågel", emoji: "🐦", sound: "Pip pip! Fågel." },
  { name: "Häst", emoji: "🐴", sound: "Gnägg! Häst." },
  { name: "Gris", emoji: "🐷", sound: "Nöff! Gris." },
  { name: "Får", emoji: "🐑", sound: "Bä! Får." },
  { name: "Björn", emoji: "🐻", sound: "Björn." },
  { name: "Räv", emoji: "🦊", sound: "Räv." },
  { name: "Uggla", emoji: "🦉", sound: "Hoo! Uggla." },
  { name: "Sköldpadda", emoji: "🐢", sound: "Sköldpadda." },
  { name: "Apa", emoji: "🐵", sound: "Apa." }
]

export const colorData = [
  { name: "röd", emoji: "🔴" },
  { name: "blå", emoji: "🔵" },
  { name: "gul", emoji: "🟡" },
  { name: "grön", emoji: "🟢" },
  { name: "lila", emoji: "🟣" },
  { name: "orange", emoji: "🟠" },
  { name: "rosa", emoji: "🌸" },
  { name: "brun", emoji: "🟤" },
  { name: "svart", emoji: "⚫" },
  { name: "vit", emoji: "⚪" }
]

export const letters = [
  { l: "A", w: "Apa", e: "🐵" }, { l: "B", w: "Boll", e: "⚽" }, { l: "D", w: "Docka", e: "🪆" }, { l: "E", w: "Elefant", e: "🐘" },
  { l: "F", w: "Fisk", e: "🐟" }, { l: "G", w: "Giraff", e: "🦒" }, { l: "H", w: "Hus", e: "🏠" }, { l: "K", w: "Katt", e: "🐱" },
  { l: "L", w: "Lejon", e: "🦁" }, { l: "M", w: "Mus", e: "🐭" }, { l: "N", w: "Nalle", e: "🧸" }, { l: "O", w: "Ost", e: "🧀" },
  { l: "P", w: "Pannkaka", e: "🥞" }, { l: "R", w: "Ring", e: "💍" }, { l: "S", w: "Sol", e: "☀️" }, { l: "T", w: "Tåg", e: "🚂" },
  { l: "V", w: "Vante", e: "🧤" }, { l: "Ä", w: "Äpple", e: "🍎" }, { l: "Ö", w: "Ödla", e: "🦎" }
]

export const patterns = [
  { seq: ["🔴", "🔵", "🔴", "🔵"], answer: "🔴", opts: ["🔴", "🟢", "⭐", "🔺", "🟣"] },
  { seq: ["🐱", "🐶", "🐱", "🐶"], answer: "🐱", opts: ["🐱", "🐸", "🐟", "🐰", "🐮"] },
  { seq: ["🍎", "🍌", "🍎", "🍌"], answer: "🍎", opts: ["🍎", "🍇", "🍌", "🍓", "🍊"] },
  { seq: ["⭐", "⭐", "🌙", "⭐", "⭐"], answer: "🌙", opts: ["☀️", "🌙", "❤️", "⭐", "🔺"] },
  { seq: ["🔺", "🔻", "🔺", "🔻"], answer: "🔺", opts: ["🔺", "🔻", "🔵", "⭐", "🟡"] },
  { seq: ["🟡", "🟢", "🟢", "🟡", "🟢", "🟢"], answer: "🟡", opts: ["🟡", "🟢", "🔴", "🔵", "🟣"] },
  { seq: ["🚗", "🚗", "🚌", "🚗", "🚗"], answer: "🚌", opts: ["🚌", "🚗", "🚒", "🚓", "✈️"] },
  { seq: ["❤️", "💙", "💚", "❤️", "💙"], answer: "💚", opts: ["💚", "❤️", "💙", "💛", "💜"] }
]

export const memoryThemes = {
  djur: { name: "Djur", icon: "🐾", items: ["🐱", "🐶", "🐮", "🦆", "🦁", "🐸", "🐟", "🐰"] },
  fordon: { name: "Fordon", icon: "🚗", items: ["🚗", "🚌", "🚒", "🚓", "🚜", "🚂", "✈️", "🚀"] },
  frukt: { name: "Frukt", icon: "🍓", items: ["🍎", "🍌", "🍓", "🍇", "🍐", "🍊", "🍉", "🍒"] },
  former: { name: "Former", icon: "⭐", items: ["🔴", "🟡", "🔵", "🟢", "🟣", "⭐", "❤️", "🔺"] }
}

export const carColors = [
  { name: "röd", def: "röda", c: "#ff5a5f" },
  { name: "blå", def: "blå", c: "#3d8bff" },
  { name: "gul", def: "gula", c: "#ffc93c" },
  { name: "grön", def: "gröna", c: "#3cc46b" },
  { name: "lila", def: "lila", c: "#a066ff" },
  { name: "orange", def: "orangea", c: "#ff8c2e" }
]

export const shadowItems = [
  { e: "🐘", n: "elefanten" }, { e: "🦒", n: "giraffen" }, { e: "🐢", n: "sköldpaddan" }, { e: "🦋", n: "fjärilen" },
  { e: "🐌", n: "snigeln" }, { e: "🦀", n: "krabben" }, { e: "🐙", n: "bläckfisken" }, { e: "🦕", n: "dinosaurien" },
  { e: "🐰", n: "kaninen" }, { e: "🐓", n: "tuppen" }, { e: "🚗", n: "bilen" }, { e: "✈️", n: "flygplanet" },
  { e: "🌳", n: "trädet" }, { e: "🍌", n: "bananen" }, { e: "🎈", n: "ballongen" }, { e: "🦔", n: "igelkotten" },
  { e: "🐧", n: "pingvinen" }, { e: "🦉", n: "ugglan" }, { e: "✂️", n: "saxen" }, { e: "☂️", n: "paraplyet" }
]

export const GAMES = {
  animal: { id: "animal", name: "Djur och ljud", emoji: "🐾", color: "bg-yellow", sub: "Hitta rätt djur." },
  memory: { id: "memory", name: "Memory", emoji: "🃏", color: "bg-green", sub: "Hitta par." },
  colors: { id: "colors", name: "Färger och former", emoji: "🎨", color: "bg-pink", sub: "Träna färger." },
  count: { id: "count", name: "Räkna", emoji: "🍎", color: "bg-blue", sub: "Räkna och välj siffra." },
  letters: { id: "letters", name: "Bokstäver och ord", emoji: "🔤", color: "bg-lav", sub: "Vilken bokstav börjar ordet?" },
  puzzle: { id: "puzzle", name: "Logik och mönster", emoji: "🧩", color: "bg-peach", sub: "Vad kommer härnäst?" },
  garage: { id: "garage", name: "Hitta garaget", emoji: "🚗", color: "bg-mint", sub: "Kör bilen till rätt garage." },
  shadow: { id: "shadow", name: "Hitta skuggan", emoji: "🌑", color: "bg-slate-100", sub: "Vilken skugga hör ihop?" }
}

export const GAME_ORDER = ["animal", "memory", "colors", "count", "letters", "puzzle", "garage", "shadow"]
export const STAGES = [
  { from: 1, to: 3, name: "Lätt", emoji: "🌱" },
  { from: 4, to: 7, name: "Mellan", emoji: "🌿" },
  { from: 8, to: 10, name: "Svår", emoji: "🌳" }
]
export const MAX_LEVEL = 10
export const QUESTIONS = 5
export const diffOptions = (level) => level <= 3 ? 3 : level <= 7 ? 4 : 5
