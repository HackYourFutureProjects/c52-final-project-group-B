import { z } from "zod";
import { objectIdSchema } from "../constants/shared.js";
import languages from "../services/openAi/prompts/languages.js";

export const deckValidationSchema = z.object({
  deckId: objectIdSchema,
});

export const updateDeckSchema = z.object({
  title: z.string().trim().min(1, "Title cannot be empty").optional(),
  description: z.string().optional(),
  language: z.array(z.string()).min(1, "At least one language is required"),
  isPublic: z.boolean().optional(),
});

export const createDeckSchema = z.object({
  userId: objectIdSchema.optional(),
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
  language: z.array(z.string()).min(1, "At least one language is required"),
  isPublic: z.boolean().optional(),
});

export const paginationQuerySchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(50).default(20),
  search: z.string().trim().max(100).optional().default(""),
  language: z.string().trim().max(100).optional().default(""),
  minCards: z.coerce.number().int().min(0).optional().default(0),
  maxCards: z.coerce.number().int().min(0).optional().default(300),
  sortBy: z
    .enum(["mostRecent", "oldest", "numCardsAsc", "numCardsDesc"])
    .default("mostRecent"),
});

export const generateDeckSchema = z.object({
  language: z
    .array(z.string().min(2, "Each language is required"))
    .nonempty("At least one language is required"),
  amountCards: z.coerce.number().int().min(1).max(50).default(20),
  userPrompt: z.string().min(3, "Description is required"),
});

export const generateDeck_V2Schema = z.object({
  userPrompt: z.string().min(3, "Description is required"),
});

export const generatedDeckSchema = z.object({
  deck: z.object({
    title: z.string().min(1, "Deck title is required"),
    description: z.string().min(1, "Deck description is required"),
    languages: z
      .array(z.enum(languages))
      .nonempty("At least one language required"),
  }),
  cards: z
    .array(
      z.object({
        question: z.string().min(1, "Question cannot be empty"),
        answer: z.string().min(1, "Answer cannot be empty"),
      }),
    )
    .min(1, "At least one card is required"),
});
