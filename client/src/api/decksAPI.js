import apiRequest from "./index.js";

export const getDecks = async ({
  page = 1,
  limit = 20,
  search = "",
  language = "",
  numCardsMin,
  numCardsMax,
  sortBy,
} = {}) => {
  const params = new URLSearchParams({
    page: String(page),
    limit: String(limit),
    search,
    language,
  });

  if (numCardsMin != null) params.set("numCardsMin", String(numCardsMin));
  if (numCardsMax != null) params.set("numCardsMax", String(numCardsMax));
  if (sortBy) params.set("sortBy", sortBy);

  return apiRequest(`/decks?${params.toString()}`);
};

export const getDeckById = async (id) => {
  return apiRequest(`/decks/${id}`);
};

export const createDeck = async (deckData) => {
  return apiRequest("/decks", "POST", deckData);
};
