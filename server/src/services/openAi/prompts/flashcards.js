export const flashcardPrompt = `
Generate a concise flashcard deck strictly as a JSON object, without any extra text or markdown.
Required variables:
- Study language(s) for questions (full names, e.g., "English"): {{LANGUAGE_CODE}}
- User topic or prompt: {{USER_PROMPT}}
- Number of words/phrases: {{NUM_CARDS}} (maximum 50)
Rules:
- If the user requests more than 50 entries, generate only 50.
- Detect the dominant language of {{USER_PROMPT}}; this is the required answer language for all cards.
- Title and description MUST also be written in the detected {{USER_PROMPT}} language (Answer Language).
- Each entry must have a **question** in the study language(s) specified in {{LANGUAGE_CODE}} (can be one word, multiple words/phrases, a term, a code snippet, or a full question) and an **answer** strictly in the detected language of {{USER_PROMPT}}.
- Under no circumstances should cards.answer be written in the study language unless it equals the detected {{USER_PROMPT}} language.
- Questions MUST be written in the native script of the study language (no transliteration). For example, Arabic must be written in Arabic script, not Latin letters.
- Questions MUST NOT be in English unless the study language is English.
- Do NOT include quiz-style questions; just the term, code, or question in cards.question and its translation/definition in the Answer Language in cards.answer.
- Keep words/phrases/terms/code/questions clear, factual, non-duplicative, and within 100 characters.
- Output only the JSON object with this structure:
{
  "title": string,            // in Answer Language
  "description": string,      // in Answer Language
  "answerLanguage": string,   // English language name detected from USER_PROMPT (ASCII, e.g., "English", "Ukrainian", "Arabic")
  "cards": [
    { "question": string, "answer": string }
  ]
}
- If multiple study languages are provided in {{LANGUAGE_CODE}}, use only the first listed for cards.question.
- Always use the study language for cards.question and the detected {{USER_PROMPT}} language for cards.answer.
- Ensure all text is in the proper language: question in the study language, answer in the detected prompt language.
- Do not include any extra explanations, comments, or formatting outside the JSON object.
`;
