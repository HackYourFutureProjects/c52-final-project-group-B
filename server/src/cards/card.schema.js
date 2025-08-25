import { z } from "zod";
import { objectIdSchema } from "../constants/shared.js";

// Card schemas
export const cardValidationSchema = z.object({
  cardId: objectIdSchema,
});

export const cardParamsSchema = z.object({
  deckId: objectIdSchema,
  cardId: objectIdSchema,
});

export const createCardSchema = z.object({
  deckId: objectIdSchema,
  question: z.string().trim().min(1, "Question is required"),
  answer: z.string().trim().min(1, "Answer is required"),
  order: z.number().min(0, "Order must be a positive integer").optional(),
});

export const updateCardSchema = z.object({
  question: z.string().trim().min(1, "Question cannot be empty").optional(),
  answer: z.string().trim().min(1, "Answer cannot be empty").optional(),
  order: z.number().min(0, "Order must be a positive integer").optional(),
});
