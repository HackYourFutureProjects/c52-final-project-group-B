import apiRequest from "./index.js";

export const getDecks = async ({
  page = 1,
  limit = 20,
  search = "",
  language = "",
  numCardsMin = 0,
  numCardsMax = 300,
  sortBy = "mostRecent",
} = {}) => {
  const params = new URLSearchParams({
    page: Number(page),
    limit: Number(limit),
    search: String(search),
    language: String(language),
    minCards: Number(numCardsMin),
    maxCards: Number(numCardsMax),
    sortBy: String(sortBy),
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
