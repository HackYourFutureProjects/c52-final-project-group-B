import UserProgress from "./userProgress.model.js";

export async function submitUserProgress(userId, results) {
  const updates = [];

  for (const { cardId, isCorrect } of results) {
    let progress = await UserProgress.findOne({ userId, cardId });

    if (!progress) {
      progress = new UserProgress({
        userId,
        cardId,
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

    progress.isLearned = isCorrect;

    progress.lastReviewed = new Date();

    updates.push(progress.save());
  }

  await Promise.all(updates);
  return { success: true };
}
