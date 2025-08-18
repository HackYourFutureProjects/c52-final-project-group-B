import mongoose from "mongoose";
import UserProgress from "./userProgress.model.js";
import { CardModel } from "../cards/card.model.js";

export async function submitUserProgress(userId, results) {
  const cardObjectIds = results.map(
    (r) => new mongoose.Types.ObjectId(r.cardId),
  );

  const existingProgresses = await UserProgress.find({
    userId,
    cardId: { $in: cardObjectIds },
  });

  const progressMap = new Map();
  for (const progress of existingProgresses) {
    progressMap.set(progress.cardId.toString(), progress);
  }

  const updates = [];

  for (const { cardId, isCorrect } of results) {
    const cardIdStr = cardId.toString();
    let progress = progressMap.get(cardIdStr);

    if (!progress) {
      progress = new UserProgress({
        userId,
        cardId: new mongoose.Types.ObjectId(cardIdStr),
        correctCount: 0,
        incorrectCount: 0,
        isLearned: false,
      });
    }

    if (isCorrect) {
      progress.correctCount += 1;
    } else {
      progress.incorrectCount += 1;
    }

    progress.isLearned = progress.isLearned || isCorrect;
    progress.lastReviewed = new Date();

    updates.push(progress.save());
  }

  await Promise.all(updates);

  return { success: true };
}

export async function getUserProgress(deckId, userId) {
  const cards = await CardModel.find({ deckId });
  const cardIds = cards.map((card) => card._id);

  const progress = await UserProgress.find({
    userId: new mongoose.Types.ObjectId(userId),
    cardId: { $in: cardIds },
    isLearned: true,
  });

  return progress.length;
}
