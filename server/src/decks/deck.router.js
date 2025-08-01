import { Router } from "express";

import {
  getDecks,
  createDeck,
  getDeckById,
  updateDeck,
  deleteDeck,
} from "./deck.controller.js";

const deckRouter = Router();

deckRouter.get("/", getDecks);
deckRouter.get("/:id", getDeckById);
deckRouter.post("/", createDeck);
deckRouter.put("/:id", updateDeck);
deckRouter.delete("/:id", deleteDeck);
export default deckRouter;
