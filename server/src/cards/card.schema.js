import mongoose from "mongoose";

export const cardSchema = new mongoose.Schema({
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
});
