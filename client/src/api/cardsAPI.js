import apiRequest from "./index.js";

export const getCardsByDeckId = async (id) => {
  return apiRequest(`/decks/${id}/cards`);
};

export const createCard = async (data) => {
  return apiRequest(`/decks/${data.deckId}/cards`, "POST", data);
};

export const updateCardById = async (deckId, cardId, cardData) => {
  return apiRequest(`/decks/${deckId}/cards/${cardId}`, "PUT", cardData, true);
};

export const deleteCardById = async (deckId, cardId) => {
  return apiRequest(`/decks/${deckId}/cards/${cardId}`, "DELETE", null, true);
};
