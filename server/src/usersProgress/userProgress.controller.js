import { HTTP_STATUS } from "../constants/httpStatus.js";
import {
  userProgressSubmitSchema,
  deckValidationSchema,
} from "./userProgress.schema.js";
import { submitUserProgress, getUserProgress } from "./userProgress.service.js";

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

export const handleGetUserProgress = async (req, res) => {
  const { deckId } = deckValidationSchema.parse(req.params);
  const progress = await getUserProgress(deckId, req.user.id);
  res.status(HTTP_STATUS.OK).json(progress);
};
