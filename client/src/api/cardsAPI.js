import apiRequest from "./index.js";

export const getCardsByDeckId = async (id) => {
  try {
    const cards = await apiRequest(`/decks/${id}/cards`);
    return cards;
  } catch (e) {
    console.error(e);
  }
};
