import apiRequest from "./index.js";

export const getCardsByDeckId = async (id) => {
  try {
    const cards = await apiRequest(`/decks/${id}/cards`);
    return cards;
  } catch (e) {
    console.error(e);
  }
};

export const createCard = async (data) => {
  try {
    const newCard = await apiRequest(
      `/decks/${data.deckId}/cards`,
      "POST",
      data
    );
    return newCard;
  } catch (e) {
    console.error(e);
  }
};
