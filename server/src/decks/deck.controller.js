import { HTTP_STATUS } from "../constants/httpStatus.js";
import {
  deckValidationSchema,
  updateDeckSchema,
  createDeckSchema,
  paginationQuerySchema,
  generateDeckSchema,
} from "./deck.schema.js";
import DeckService from "./deck.service.js";
import {
  cardParamsSchema,
  createCardSchema,
  updateCardSchema,
} from "../cards/card.schema.js";
import { generateFlashcards } from "../services/openAi/openAI.js";

const deckService = new DeckService();

export const getDecks = async (req, res) => {
  const { page, limit, search, language, minCards, maxCards, sortBy } =
    paginationQuerySchema.parse(req.query);
  const decks = await deckService.getDecks({
    page,
    limit,
    search,
    language,
    minCards,
    maxCards,
    sortBy,
  });
  res.status(HTTP_STATUS.OK).json(decks);
};
export const getMyDecks = async (req, res) => {
  const { page, limit, search, language, minCards, maxCards, sortBy } =
    paginationQuerySchema.parse(req.query);
  const decks = await deckService.getMyDecks(req.user.id, {
    page,
    limit,
    search,
    language,
    minCards,
    maxCards,
    sortBy,
  });
  res.status(HTTP_STATUS.OK).json(decks);
};
export const getDeckById = async (req, res) => {
  const { deckId } = deckValidationSchema.parse(req.params);
  const deck = await deckService.getDeckById(deckId);
  res.status(HTTP_STATUS.OK).json(deck);
};

export const updateDeck = async (req, res) => {
  const { deckId } = deckValidationSchema.parse(req.params);
  const updatedData = updateDeckSchema.parse(req.body);
  const deck = await deckService.updateDeck(deckId, updatedData, req.user.id);

  res.status(HTTP_STATUS.OK).json(deck);
};

export const createDeck = async (req, res) => {
  const deckData = createDeckSchema.parse(req.body);
  deckData.userId = req.user.id;
  // Normalize language into an array of trimmed, unique items
  if (Array.isArray(deckData.language)) {
    deckData.language = [
      ...new Set(
        deckData.language.flatMap((l) =>
          String(l)
            .split(",")
            .map((s) => s.trim())
            .filter(Boolean),
        ),
      ),
    ];
  } else if (typeof deckData.language === "string") {
    deckData.language = [
      ...new Set(
        String(deckData.language)
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean),
      ),
    ];
  }
  const newDeck = await deckService.createDeck(deckData);
  res.status(HTTP_STATUS.CREATED).json(newDeck);
};

export const deleteDeck = async (req, res) => {
  const { deckId } = deckValidationSchema.parse(req.params);
  await deckService.deleteDeck(deckId, req.user.id);

  res.status(HTTP_STATUS.OK).json({ message: "Deck deleted successfully" });
};

export const generateDeck = async (req, res) => {
  const { language, amountCards, userPrompt } = generateDeckSchema.parse(
    req.body,
  );
  // Normalize languages for AI and persistence
  const normalizedLanguage = Array.isArray(language)
    ? [
        ...new Set(
          language.flatMap((l) =>
            String(l)
              .split(",")
              .map((s) => s.trim())
              .filter(Boolean),
          ),
        ),
      ]
    : [
        ...new Set(
          String(language || "")
            .split(",")
            .map((s) => s.trim())
            .filter(Boolean),
        ),
      ];

  // Convert study language keys to human-readable names for AI prompt (e.g., "arabic" -> "Arabic")
  const toLanguageName = (value) =>
    String(value)
      .replace(/[_-]+/g, " ")
      .replace(/\s+/g, " ")
      .trim()
      .toLowerCase()
      .replace(/\b\w/g, (c) => c.toUpperCase());

  const languageForAi = normalizedLanguage.map(toLanguageName);

  // Generate deck and cards using AI
  const parsedDeck = await generateFlashcards({
    language: languageForAi,
    numCards: amountCards,
    userPrompt,
  });

  // Merge detected answer language into deck languages (for DB and client)
  let deckLanguages = [...normalizedLanguage];
  try {
    const answerLanguageName = String(parsedDeck?.answerLanguage || "").trim();
    if (answerLanguageName) {
      const toLanguageKey = (value) =>
        String(value)
          .toLowerCase()
          .replace(/\s*\(.*?\)\s*/g, "") // drop parenthetical qualifiers
          .replace(/[^a-z]/g, ""); // keep a-z only
      const answerKey = toLanguageKey(answerLanguageName);
      if (answerKey && !deckLanguages.includes(answerKey)) {
        deckLanguages.push(answerKey);
      }
    }
  } catch (e) {
    // ignore parse issues; proceed with provided study language(s)
  }

  // Create the deck
  const deck = await deckService.createDeck({
    title: parsedDeck.title,
    description: parsedDeck.description,
    userId: req.user.id,
    language: deckLanguages,
    isPublic: true,
    createdAt: new Date(),
  });

  // Create all cards for this deck
  const cards = await Promise.all(
    parsedDeck.cards.map((card) =>
      deckService.createDeckCard({ ...card, deckId: deck._id }, req.user.id),
    ),
  );

  res.status(HTTP_STATUS.CREATED).json({ deck, cards });
};

//deck cards controller
export const getCardsByDeckId = async (req, res) => {
  const { deckId } = deckValidationSchema.parse(req.params);
  const cards = await deckService.getCardsByDeckId(deckId);
  res.status(HTTP_STATUS.OK).json(cards);
};

export const getCardById = async (req, res) => {
  const { deckId, cardId } = cardParamsSchema.parse(req.params);
  const card = await deckService.getCardByDeckAndCardId(deckId, cardId);
  res.status(HTTP_STATUS.OK).json(card);
};

export const createCard = async (req, res) => {
  const { deckId } = deckValidationSchema.parse(req.params);
  const rawCardData = { ...req.body, deckId };
  const cardData = createCardSchema.parse(rawCardData);
  const newCard = await deckService.createDeckCard(cardData, req.user.id);

  res.status(HTTP_STATUS.CREATED).json(newCard);
};

export const updateCardById = async (req, res) => {
  const { deckId, cardId } = cardParamsSchema.parse(req.params);
  const updatedCardData = updateCardSchema.parse(req.body);
  const updatedCard = await deckService.updateCard(
    deckId,
    cardId,
    updatedCardData,
    req.user.id,
  );
  res.status(HTTP_STATUS.OK).json(updatedCard);
};

export const deleteCardById = async (req, res) => {
  const { deckId, cardId } = cardParamsSchema.parse(req.params);
  await deckService.deleteCardByDeckAndId(deckId, cardId, req.user.id);

  res.status(HTTP_STATUS.OK).json({ message: "Card deleted successfully" });
};
