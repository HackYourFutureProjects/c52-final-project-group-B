import apiRequest from "./index.js";

export const getCardsByDeckId = async (id) => {
  return apiRequest(`/decks/${id}/cards`);
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
