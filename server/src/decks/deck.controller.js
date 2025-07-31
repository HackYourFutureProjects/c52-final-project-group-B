import { HTTP_STATUS } from "../constants/httpStatus.js";
import {
  deckValidationSchema,
  updateDeckSchema,
  createDeckSchema,
} from "./deck.schema.js";
import DeckService from "./deck.service.js";

const deckService = new DeckService();

export const getDecks = async (req, res) => {
  const decks = await deckService.getDecks();
  res.status(HTTP_STATUS.OK).json(decks);
};

export const getDeckById = async (req, res) => {
  const { id } = deckValidationSchema.parse(req.params);
  const deck = await deckService.getDeckById(id);
  res.status(HTTP_STATUS.OK).json(deck);
};

export const updateDeck = async (req, res) => {
  const { id } = deckValidationSchema.parse(req.params);
  const updatedData = updateDeckSchema.parse(req.body);

  const deck = await deckService.updateDeck(id, updatedData);
  res.status(HTTP_STATUS.OK).json(deck);
};

export const createDeck = async (req, res) => {
  const deckData = createDeckSchema.parse(req.body);
  const newDeck = await deckService.createDeck(deckData);

  res.status(HTTP_STATUS.CREATED).json(newDeck);
};

export const deleteDeck = async (req, res) => {
  const { id } = deckValidationSchema.parse(req.params);

  await deckService.deleteDeck(id);

  res.status(HTTP_STATUS.OK).json({ message: "Deck deleted successfully" });
};
