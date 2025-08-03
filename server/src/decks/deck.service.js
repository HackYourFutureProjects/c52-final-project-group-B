// eslint-disable-next-line no-unused-vars
import { User } from "../users/user.model.js"; //do not delete!!!
import { DeckModel } from "./deck.model.js";
import { CardModel } from "../cards/card.model.js";
import { HTTP_STATUS } from "../constants/httpStatus.js";
import { createAndThrowError } from "../util/createAndThrowError.js";

class DeckService {
  async getDecks() {
    const decks = await DeckModel.find().populate("userId", "username");

    const decksWithCount = await Promise.all(
      decks.map(async (deck) => {
        const deckObj = deck.toObject();
        deckObj.userInfo = deckObj.userId;
        delete deckObj.userId;

        const count = await CardModel.countDocuments({ deckId: deck._id });
        deckObj.cardsCount = count;

        return deckObj;
      }),
    );

    return decksWithCount;
  }

  async getDeckById(id) {
    const deck = await DeckModel.findById(id).populate("userId", "username");
    if (!deck) createAndThrowError(HTTP_STATUS.NOT_FOUND, "Deck not found");

    const deckObj = deck.toObject();
    deckObj.userInfo = deckObj.userId;
    delete deckObj.userId;

    const count = await CardModel.countDocuments({ deckId: deck._id });
    deckObj.cardsCount = count;

    return deckObj;
  }

  async updateDeck(id, updatedData) {
    const updatedDeck = await DeckModel.findByIdAndUpdate(id, updatedData, {
      new: true,
      runValidators: true,
    });

    if (!updatedDeck) {
      const error = new Error("Deck not found");
      error.status = HTTP_STATUS.NOT_FOUND;
      throw error;
    }

    return updatedDeck;
  }

  async createDeck(data) {
    return await DeckModel.create(data);
  }

  async deleteDeck(id) {
    const deleted = await DeckModel.findByIdAndDelete(id);

    if (!deleted) {
      const error = new Error("Deck not found");
      error.status = HTTP_STATUS.NOT_FOUND;
      throw error;
    }

    return deleted;
  }

  async getCardsByDeckId(id) {
    const deck = await DeckModel.findById(id);

    if (!deck) createAndThrowError(HTTP_STATUS.NOT_FOUND, "Deck not found");

    const cards = await CardModel.find({ deckId: id }).sort({ createdAt: 1 });
    return cards;
  }

  async getCardByDeckAndCardId(deckId, cardId) {
    const card = await CardModel.findOne({
      _id: cardId,
      deckId: deckId,
    });

    if (!card) {
      createAndThrowError(HTTP_STATUS.NOT_FOUND, "Card not found");
    }

    return card;
  }

  async createDeckCard(cardData) {
    return await CardModel.create(cardData);
  }

  async updateCard(deckId, cardId, data) {
    const updatedCard = await CardModel.findOneAndUpdate(
      { _id: cardId, deckId },
      { $set: data },
      { new: true },
    );

    if (!updatedCard) {
      createAndThrowError(HTTP_STATUS.NOT_FOUND, "Card not found");
    }

    return updatedCard;
  }

  async deleteCardByDeckAndId(deckId, cardId) {
    const deleted = await CardModel.findOneAndDelete({
      _id: cardId,
      deckId: deckId,
    });

    if (!deleted) {
      createAndThrowError(
        HTTP_STATUS.NOT_FOUND,
        "Card not found or does not belong to this deck",
      );
    }
  }
}

export default DeckService;
