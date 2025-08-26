const keyForDeck = (deckId) => `cardProgress-${deckId}`;

function read(deckId) {
  const raw = localStorage.getItem(keyForDeck(deckId));
  if (!raw) return null;
  return JSON.parse(raw);
}

function write(deckId, data) {
  localStorage.setItem(keyForDeck(deckId), JSON.stringify(data));
}

export function getCardProgress(deckId) {
  return read(deckId);
}

export function saveCardProgress(deckId, partialUpdate = {}) {
  const current = read(deckId) || {};
  const updated = { ...current, ...partialUpdate };
  write(deckId, updated);
  return updated;
}

export function markFinished(deckId) {
  return saveCardProgress(deckId, { finished: true });
}

export function markSubmitted(deckId) {
  return saveCardProgress(deckId, { submitted: true, submittedAt: Date.now() });
}

export function unmarkSubmitted(deckId) {
  const current = read(deckId);
  if (!current) return;
  const rest = { ...current };
  delete rest.submitted;
  delete rest.submittedAt;
  write(deckId, rest);
}

export function clearCardProgress(deckId) {
  localStorage.removeItem(keyForDeck(deckId));
}
