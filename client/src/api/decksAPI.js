import apiRequest from "./index.js";

export const getDecks = async ({ page = 1, limit = 10 } = {}) => {
  const params = new URLSearchParams({
    page: String(page),
    limit: String(limit),
  });
  return apiRequest(`/decks?${params.toString()}`);
};

export const getDeckById = async (id) => {
  return apiRequest(`/decks/${id}`);
};

export const createDeck = async (deckData) => {
  return apiRequest("/decks", "POST", deckData, true);
};

export const updateDeck = async (deckId, deckData) => {
  return apiRequest(`/decks/${deckId}`, "PUT", deckData, true);
};

export const deleteDeck = async (deckId) => {
  return apiRequest(`/decks/${deckId}`, "DELETE", null, true);
};
