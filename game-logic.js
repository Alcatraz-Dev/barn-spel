export function chooseNextColor(colors, lastColorId = null, random = Math.random) {
  if (!Array.isArray(colors) || colors.length === 0) return null;
  const available = lastColorId ? colors.filter(({ id }) => id !== lastColorId) : [...colors];
  const pool = available.length ? available : colors;
  return pool[Math.min(pool.length - 1, Math.floor(random() * pool.length))];
}

export function createPuzzleState(random = Math.random) {
  const pieces = [0, 1, 2, 3];
  for (let index = pieces.length - 1; index > 0; index--) {
    const other = Math.floor(random() * (index + 1));
    [pieces[index], pieces[other]] = [pieces[other], pieces[index]];
  }
  if (pieces.every((piece, index) => piece === index)) [pieces[0], pieces[1]] = [pieces[1], pieces[0]];
  return { pieces, slots: [null, null, null, null], selected: null, completed: false };
}

export function shufflePieces(pieces, random = Math.random) {
  const shuffled = [...pieces];
  for (let index = shuffled.length - 1; index > 0; index--) {
    const other = Math.floor(random() * (index + 1));
    [shuffled[index], shuffled[other]] = [shuffled[other], shuffled[index]];
  }
  return shuffled;
}

export function placePuzzlePiece(state, pieceIndex, targetIndex) {
  if (state.completed || !Number.isInteger(pieceIndex) || pieceIndex < 0 || pieceIndex >= state.pieces.length) return 'invalid';
  if (!Number.isInteger(targetIndex) || targetIndex < 0 || targetIndex >= 4 || state.slots[targetIndex] !== null) return 'invalid';
  const piece = state.pieces[pieceIndex];
  state.pieces.splice(pieceIndex, 1);
  state.selected = null;
  if (piece !== targetIndex) {
    state.pieces.push(piece);
    return 'wrong';
  }
  state.slots[targetIndex] = piece;
  if (state.slots.every((placed, slot) => placed === slot)) {
    state.completed = true;
    return 'completed';
  }
  return 'placed';
}
