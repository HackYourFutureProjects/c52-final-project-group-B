import mongoose from "mongoose";

const cardSchema = new mongoose.Schema({
  deckId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Deck",
  },
  question: {
    type: String,
    required: true,
  },
  answer: {
    type: String,
    required: true,
  },
  order: {
    type: Number,
    min: 0,
    default: 0,
  },
});

export const CardModel = mongoose.model("Card", cardSchema, "cards");
