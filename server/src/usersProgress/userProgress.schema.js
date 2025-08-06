import { z } from "zod";

export const userProgressSubmitSchema = z.object({
  userId: z.string().min(1),
  results: z
    .array(
      z.object({
        cardId: z.string().min(1),
        isCorrect: z.boolean(),
      }),
    )
    .min(1),
});
