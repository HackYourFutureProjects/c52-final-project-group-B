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
      validator: function (languages) {
        return languages.length >= 1;
      },
      message: "At least one language is required",
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
