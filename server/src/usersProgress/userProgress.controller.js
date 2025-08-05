import { submitUserProgress } from "./userProgress.service.js";

export async function handleSubmitUserProgress(req, res) {
  const { userId, results } = req.body;

  if (!userId || !Array.isArray(results)) {
    res.status(400).json({ error: "Invalid request data" });
    return;
  }

  await submitUserProgress(userId, results);

  res.status(200).json({ message: "User progress submitted successfully" });
}
