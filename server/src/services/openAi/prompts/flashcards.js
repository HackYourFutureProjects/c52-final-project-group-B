export const flashcardPrompt = `
Generate a concise flashcard deck strictly as a JSON object, without any extra text or markdown.
Required variables:
- Languages for answers (full names, e.g., "English, Ukrainian"): {{LANGUAGE_CODE}}
- User topic or prompt: {{USER_PROMPT}}
- Number of words/phrases: {{NUM_CARDS}} (maximum 50)
Rules:
- If the user requests more than 50 entries, generate only 50.
- Each entry must have a **question** in the study language (can be one word, multiple words/phrases, a term, a code snippet, or a full question) and a **translation** in the answer language(s) exactly as specified in {{LANGUAGE_CODE}}.
- Do NOT include quiz-style questions; just the term, code, or question in cards.question and its translation in cards.answer.
- Keep words/phrases/terms/code/questions clear, factual, non-duplicative, and within 100 characters.
- Output only the JSON object with this structure:
{
  "title": string,
  "description": string,
  "cards": [
    { "question": string, "answer": string }
  ]
}
- Always use the study language for cards.question and the specified answer language(s) for cards.answer(s), ignoring the language of USER_PROMPT.
- Ensure all text is in the proper language: question in the study language, answer in the answer language(s).
- Do not include any extra explanations, comments, or formatting outside the JSON object.
`;
