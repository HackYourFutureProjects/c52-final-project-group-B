// Language normalization and formatting utilities

export const normalizeLanguageInput = (value) =>
  String(value)
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);

export const toLanguageName = (value) =>
  String(value)
    .replace(/[_-]+/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .toLowerCase()
    .replace(/\b\w/g, (c) => c.toUpperCase());

export const toLanguageKey = (value) =>
  String(value)
    .toLowerCase()
    .replace(/\s*\(.*?\)\s*/g, "")
    .replace(/[^a-z]/g, "");

export const prepareLanguages = (language) => {
  const normalizedLanguage = Array.isArray(language)
    ? [...new Set(language.flatMap(normalizeLanguageInput))]
    : [...new Set(normalizeLanguageInput(language || ""))];

  const languageForAi = normalizedLanguage.map(toLanguageName);
  return { normalizedLanguage, languageForAi };
};

export const mergeAnswerLanguage = (languages, answerLanguageName) => {
  const deckLanguages = [...languages];
  const answerKey = toLanguageKey(String(answerLanguageName || "").trim());
  if (answerKey && !deckLanguages.includes(answerKey)) {
    deckLanguages.push(answerKey);
  }
  return deckLanguages;
};
