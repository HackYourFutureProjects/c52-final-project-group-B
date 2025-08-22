// services/ai.service.js
import openai from "./config/openai.js";
import { flashcardPrompt } from "./prompts/flashcards.js";

export async function generateFlashcards({ language, numCards, userPrompt }) {
  const languageList = language.join(", ");

  let systemPrompt = flashcardPrompt
    .replace("{{LANGUAGE_CODE}}", languageList)
    .replace("{{NUM_CARDS}}", Math.min(numCards, 50))
    .replace("{{USER_PROMPT}}", userPrompt);

  const response = await openai.responses.create({
    model: "gpt-4.1-mini",
    input: [
      { role: "system", content: [{ type: "input_text", text: systemPrompt }] },
    ],
    temperature: 1,
    max_output_tokens: 2048,
  });

  return JSON.parse(response.output_text); // { title, description, cards: [...] }
}
