import mongoose from "mongoose";

const cardSchema = new mongoose.Schema({
  deckId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Decks"
  },
  question: {
    type: String,
    required: true
  },
  answer: {
    type: String,
    required: true
  }
});

const Card = mongoose.model("Card", cardSchema, "cards");
export default Card;