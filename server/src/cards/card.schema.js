import { z } from "zod";
import { objectIdSchema } from "../constants/shared.js";

export const cardValidationSchema = z.object({
  deckId: objectIdSchema,
  question: z.string().min(1, "The 'question' field is required"),
  answer: z.string().min(1, "The 'answer' field is required"),
});
