// eslint-disable-next-line no-unused-vars
import { User } from "../users/user.model.js"; //do not delete!!!
import mongoose from "mongoose";
import { DeckModel } from "./deck.model.js";
import { CardModel } from "../cards/card.model.js";
import { HTTP_STATUS } from "../constants/httpStatus.js";
import { createAndThrowError } from "../util/createAndThrowError.js";

class DeckService {
  async getDecks({ page = 1, limit = 20 } = {}) {
    const pageNumber = Math.max(1, Number(page));
    const pageSize = Math.min(100, Math.max(1, Number(limit)));

    const [total, decks] = await Promise.all([
      DeckModel.countDocuments(),
      DeckModel.find()
        .sort({ createdAt: -1 })
        .skip((pageNumber - 1) * pageSize)
        .limit(pageSize)
        .populate("userId", "username"),
    ]);

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

    return {
      items: decksWithCount,
      total,
      page: pageNumber,
      limit: pageSize,
      pages: Math.ceil(total / pageSize),
    };
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
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
      const deleted = await DeckModel.findByIdAndDelete(id).session(session);

      if (!deleted) {
        await session.abortTransaction();
        createAndThrowError(HTTP_STATUS.NOT_FOUND, "Deck not found");
      }

      await CardModel.deleteMany({ deckId: id }).session(session);

      await session.commitTransaction();
      return deleted;
    } catch (err) {
      await session.abortTransaction();
      throw err;
    } finally {
      session.endSession();
    }
  }

  async getCardsByDeckId(id) {
    const deck = await DeckModel.findById(id);

    if (!deck) createAndThrowError(HTTP_STATUS.NOT_FOUND, "Deck not found");

    const cards = await CardModel.find({ deckId: id });
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
