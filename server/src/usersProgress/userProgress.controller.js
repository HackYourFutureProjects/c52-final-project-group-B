import { userProgressSubmitSchema } from "./userProgress.schema.js";
import { submitUserProgress } from "./userProgress.service.js";

export function handleSubmitUserProgress(req, res, next) {
  if (!req.user) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const parseResult = userProgressSubmitSchema.safeParse(req.body);

  if (!parseResult.success) {
    return res.status(400).json({
      error: "Invalid request data",
      details: parseResult.error.format(),
    });
  }

  const { userId, results } = parseResult.data;

  submitUserProgress(userId, results)
    .then(() => {
      res.status(200).json({ message: "User progress submitted successfully" });
    })
    .catch(next);
}
