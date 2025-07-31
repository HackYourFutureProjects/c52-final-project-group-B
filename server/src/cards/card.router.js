import { Router } from "express";
import { createCard } from "./card.controller.js";

const cardRouter = Router();

cardRouter.post("/", createCard);
// cardRouter.get("/deck/:deckId", getCardsByDeck);

export default cardRouter;
