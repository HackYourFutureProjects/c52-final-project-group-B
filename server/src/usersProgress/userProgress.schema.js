import mongoose from "mongoose";

export const userProgressSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  cardId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Card",
  },
  correctCount: {
    type: Number,
    default: 0,
  },
  incorrectCount: {
    type: Number,
    default: 0,
  },
  isLearned: {
    type: Boolean,
    default: false,
  },
});
