import { z } from "zod";
import { objectIdSchema } from "../constants/shared.js";

export const deckValidationSchema = z.object({
  deckId: objectIdSchema,
});

export const updateDeckSchema = z.object({
  title: z.string().trim().min(1, "Title cannot be empty").optional(),
  description: z.string().optional(),
  language: z.string().optional(),
  isPublic: z.boolean().optional(),
});

export const createDeckSchema = z.object({
  userId: objectIdSchema.optional(),
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
  language: z.string().min(1, "Language is required"),
  isPublic: z.boolean().optional(),
});

export const paginationQuerySchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(50).default(20),
});
