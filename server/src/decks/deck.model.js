import mongoose from "mongoose";
import { deckSchema } from "./deck.schema.js";

export const Deck = mongoose.model("Deck", deckSchema, "decks");
