import mongoose from "mongoose";

export const deckSchema = new mongoose.Schema({
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
    maxlength: 500,
  },
  language: {
    type: [String],
    required: true,
    validate: {
      validator: function (arr) {
        return arr.every((str) => str.length >= 2 && str.length <= 50);
      },
      message: "Each language must be between 2 and 50 characters long",
    },
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

export const DeckModel = mongoose.model("Deck", deckSchema, "decks");
