import apiRequest from "./index.js";

export const getDecks = async () => {
  try {
    const decks = await apiRequest("/decks");
    return decks;
  } catch (e) {
    console.error(e);
  }
};
