import { Router } from "express";

import {
  getDecks,
  createDeck,
  getDeckById,
  updateDeck,
  deleteDeck,
} from "./deck.controller.js";

const deckRouter = Router();

deckRouter.get("/decks", getDecks);
deckRouter.get("/deck/:id", getDeckById);
deckRouter.post("/deck", createDeck);
deckRouter.put("/deck/:id", updateDeck);
deckRouter.delete("/deck/:id", deleteDeck);
export default deckRouter;
