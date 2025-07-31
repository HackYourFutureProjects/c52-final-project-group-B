import { z } from "zod";
import { objectIdSchema } from "../constants/shared.js";

export const deckValidationSchema = z.object({
  id: objectIdSchema,
});

export const updateDeckSchema = z.object({
  title: z.string().min(1).optional(),
  description: z.string().optional(),
  language: z.string().optional(),
  isPublic: z.boolean().optional(),
});

export const createDeckSchema = z.object({
  userId: objectIdSchema,
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
  language: z.string().min(1, "Language is required"),
  isPublic: z.boolean().optional(),
});
