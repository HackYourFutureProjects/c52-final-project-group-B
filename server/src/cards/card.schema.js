import { z } from "zod";

const objectIdSchema = z.string().regex(/^[a-f\d]{24}$/i, {
  message: "Must be a valid Id",
});

export const cardValidationSchema = z.object({
  deckId: objectIdSchema,
  question: z.string().min(1, "The 'question' field is required"),
  answer: z.string().min(1, "The 'answer' field is required"),
});
