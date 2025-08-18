import { Router } from "express";
import { authenticate } from "../middlewares/auth.js";

import {
  getDecks,
  getMyDecks,
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

deckRouter.get("/", getDecks);
deckRouter.get("/mine", authenticate, getMyDecks);
deckRouter.post("/", authenticate, createDeck);
deckRouter.get("/:deckId", getDeckById);
deckRouter.put("/:deckId", authenticate, updateDeck);
deckRouter.delete("/:deckId", authenticate, deleteDeck);

deckRouter.get("/:deckId/cards", getCardsByDeckId);
deckRouter.get("/:deckId/cards/:cardId", getCardById);
deckRouter.post("/:deckId/cards", authenticate, createCard);
deckRouter.put("/:deckId/cards/:cardId", authenticate, updateCardById);
deckRouter.delete("/:deckId/cards/:cardId", authenticate, deleteCardById);

export default deckRouter;
