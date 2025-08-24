import { HTTP_STATUS } from "../constants/httpStatus.js";
import {
  deckValidationSchema,
  updateDeckSchema,
  createDeckSchema,
  paginationQuerySchema,
  generateDeckSchema,
  generateDeck_V2Schema,
} from "./deck.schema.js";
import DeckService from "./deck.service.js";
import {
  cardParamsSchema,
  createCardSchema,
  updateCardSchema,
} from "../cards/card.schema.js";
import { generateFlashcards } from "../services/openAi/openAI.js";
import {
  prepareLanguages,
  mergeAnswerLanguage,
} from "../util/languageUtils.js";

const deckService = new DeckService();

/**
 * Create a deck and all of its cards in one step.
 */
const createDeckWithCards = async (parsedDeck, deckLanguages, userId) => {
  const deck = await deckService.createDeck({
    title: parsedDeck.title,
    description: parsedDeck.description,
    userId,
    language: deckLanguages,
    isPublic: true,
    createdAt: new Date(),
  });

  const cards = await Promise.all(
    parsedDeck.cards.map((card) =>
      deckService.createDeckCard({ ...card, deckId: deck._id }, userId),
    ),
  );

  return { deck, cards };
};

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
  const newDeck = await deckService.createDeck(deckData);
  res.status(HTTP_STATUS.CREATED).json(newDeck);
};

export const deleteDeck = async (req, res) => {
  const { deckId } = deckValidationSchema.parse(req.params);
  await deckService.deleteDeck(deckId, req.user.id);

  res.status(HTTP_STATUS.OK).json({ message: "Deck deleted successfully" });
};

/**
 * Generate a deck using AI, then persist the deck and its cards.
 */
export const generateDeck = async (req, res) => {
  const { language, amountCards, userPrompt } = generateDeckSchema.parse(
    req.body,
  );

  // 1) Prepare input languages for AI and DB
  const { normalizedLanguage: studyLanguages, languageForAi: aiLanguages } =
    prepareLanguages(language);
  const numCards = amountCards;

  // 2) Ask AI to generate deck content
  const aiDeck = await generateFlashcards({
    language: aiLanguages,
    numCards,
    userPrompt,
  });

  // 3) Merge any detected answer language (kept as normalized key)
  const persistedLanguages = mergeAnswerLanguage(
    studyLanguages,
    aiDeck?.answerLanguage,
  );

  // 4) Persist deck and cards
  const { deck, cards } = await createDeckWithCards(
    aiDeck,
    persistedLanguages,
    req.user.id,
  );

  res.status(HTTP_STATUS.CREATED).json({ deck, cards });
};

export const generateDeck_V2 = async (req, res) => {
  const { userPrompt } = generateDeck_V2Schema.parse(req.body);
  const generatedDeck = await deckService.generateDeck_V2(userPrompt);

  res.status(HTTP_STATUS.CREATED).json(generatedDeck);
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
