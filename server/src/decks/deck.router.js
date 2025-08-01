import { Router } from "express";

import {
  getDecks,
  createDeck,
  getDeckById,
  updateDeck,
  deleteDeck,
  getCardsByDeckId,
  getCardById,
  createCard,
  updateCardById,
  deleteCardById,
} from "./deck.controller.js";

const deckRouter = Router();

//deck
deckRouter.get("/", getDecks);
deckRouter.post("/", createDeck);
deckRouter.get("/:deckId", getDeckById);
deckRouter.put("/:deckId", updateDeck);
deckRouter.delete("/:deckId", deleteDeck);

deckRouter.get("/:deckId/cards", getCardsByDeckId);
deckRouter.get("/:deckId/cards/:cardId", getCardById);
deckRouter.post("/:deckId/cards", createCard);
deckRouter.put("/:deckId/cards/:cardId", updateCardById);
deckRouter.delete("/:deckId/cards/:cardId", deleteCardById);

export default deckRouter;
