import apiRequest from "./index.js";

export const getDecks = async () => {
  return apiRequest("/decks");
};

export const getDeckById = async (id) => {
  return apiRequest(`/decks/${id}`);
};

export const createDeck = async (deckData) => {
  return apiRequest("/decks", "POST", deckData);
};
