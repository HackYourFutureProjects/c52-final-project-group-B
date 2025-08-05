import { z } from "zod";

export const userProgressSubmitSchema = z.object({
  userId: z.string().min(1, "userId is required"),
  results: z
    .array(
      z.object({
        cardId: z.string().min(1, "cardId is required"),
        isCorrect: z.boolean(),
      }),
    )
    .min(1, "At least one result is required"),
});
