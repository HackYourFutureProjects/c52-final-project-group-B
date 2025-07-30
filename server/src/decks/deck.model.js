import mongoose from "mongoose";
import { deckSchema } from "./deck.schema";

export const Deck = mongoose.model("Deck", deckSchema, "decks");
