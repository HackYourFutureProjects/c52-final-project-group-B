import mongoose from "mongoose";

const deckSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  title: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 100,
  },
  description: {
    type: String,
    minlength: 10,
    maxlength: 500,
  },
  language: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 50,
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now,
  },
  isPublic: {
    type: Boolean,
    required: true,
    default: false,
  },
});

const Deck = mongoose.model("Deck", deckSchema, "decks");
export default Deck;
