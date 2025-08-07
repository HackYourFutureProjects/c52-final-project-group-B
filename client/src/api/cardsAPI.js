import apiRequest from "./index.js";

export const getCardsByDeckId = async (id) => {
  return apiRequest(`/decks/${id}/cards`);
};

export const createCard = async (data) => {
  return apiRequest(`/decks/${data.deckId}/cards`, "POST", data);
};
