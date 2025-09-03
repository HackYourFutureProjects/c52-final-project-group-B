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

export const getMyDecks = async (params = {}) => {
  const qs = new URLSearchParams(params).toString();
  return apiRequest(`/decks/mine${qs ? `?${qs}` : ""}`, "GET", null, true);
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

export const generateDeck = async (userPrompt) => {
  return apiRequest("/decks/generate", "POST", { userPrompt }, true);
};
