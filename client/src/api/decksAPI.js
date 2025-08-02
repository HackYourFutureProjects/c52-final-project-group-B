import apiRequest from "./index.js";

export const getDecks = async () => {
  try {
    const decks = await apiRequest("/decks");
    return decks;
  } catch (e) {
    console.error(e);
  }
};

export const getDeckById = async (id) => {
  try {
    const deck = await apiRequest(`/decks/${id}`);
    return deck;
  } catch (e) {
    console.error(e);
  }
};

export const createDeck = async (deckData) => {
  try {
    const newDeck = await apiRequest("/decks", "POST", deckData);
    return newDeck;
  } catch (e) {
    console.error(e);
  }
};
