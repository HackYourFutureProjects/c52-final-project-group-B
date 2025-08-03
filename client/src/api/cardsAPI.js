import apiRequest from "./index.js";

export const getCardsByDeckId = async (id) => {
  return apiRequest(`/decks/${id}/cards`);
};
