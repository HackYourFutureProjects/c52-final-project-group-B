// eslint-disable-next-line no-unused-vars
import { User } from "../users/user.model.js"; //do not delete!!!
import mongoose from "mongoose";
import { DeckModel } from "./deck.model.js";
import { CardModel } from "../cards/card.model.js";
import { HTTP_STATUS } from "../constants/httpStatus.js";
import { createAndThrowError } from "../util/createAndThrowError.js";

class DeckService {
  #escapeRegExp(s = "") {
    return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  }

  async getDecks({ page = 1, limit = 20, search = "" } = {}) {
    const pageNumber = Math.max(1, Number(page));
    const pageSize = Math.min(100, Math.max(1, Number(limit)));
    const skip = (pageNumber - 1) * pageSize;

    const hasSearch = typeof search === "string" && search.trim() !== "";
    const escaped = this.#escapeRegExp(search.trim());
    const regex = new RegExp(escaped, "i");

    const matchStage = hasSearch
      ? {
          $match: {
            $or: [
              { title: { $regex: regex } },
              { description: { $regex: regex } },
              { "cards.question": { $regex: regex } },
              { "cards.answer": { $regex: regex } },
            ],
          },
        }
      : null;

    const pipeline = [
      {
        $lookup: {
          from: "cards",
          localField: "_id",
          foreignField: "deckId",
          as: "cards",
        },
      },
      ...(matchStage ? [matchStage] : []),
      { $addFields: { cardsCount: { $size: "$cards" } } },
      {
        $lookup: {
          from: "users",
          localField: "userId",
          foreignField: "_id",
          as: "userInfo",
        },
      },
      { $unwind: "$userInfo" },
      {
        $project: {
          cards: 0,
          userId: 0,
          "userInfo.email": 0,
          "userInfo.password": 0,
          "userInfo.isDeleted": 0,
          "userInfo.createdAt": 0,
          "userInfo.updatedAt": 0,
        },
      },
      { $sort: { createdAt: -1 } },
      {
        $facet: {
          meta: [{ $count: "total" }],
          items: [{ $skip: skip }, { $limit: pageSize }],
        },
      },
    ];

    const [res] = await DeckModel.aggregate(pipeline);
    const total = res?.meta?.[0]?.total ?? 0;

    return {
      items: res?.items ?? [],
      total,
      page: pageNumber,
      limit: pageSize,
      pages: Math.ceil(total / pageSize) || 1,
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

  async updateDeck(id, updatedData, userId) {
    const userObjectId = new mongoose.Types.ObjectId(userId);
    const existingDeck = await DeckModel.findById(id);

    if (!existingDeck) {
      const error = new Error("Deck not found");
      error.status = HTTP_STATUS.NOT_FOUND;
      throw error;
    }

    const updatedDeck = await DeckModel.findOneAndUpdate(
      { _id: id, userId: userObjectId },
      updatedData,
      {
        new: true,
        runValidators: true,
      },
    );

    if (!updatedDeck) {
      const error = new Error(
        "Deck not found or you don't have permission to update it",
      );
      error.status = HTTP_STATUS.NOT_FOUND;
      throw error;
    }

    return updatedDeck;
  }

  async createDeck(data) {
    if (data.userId) {
      data.userId = new mongoose.Types.ObjectId(data.userId);
    }
    return await DeckModel.create(data);
  }

  async deleteDeck(id, userId) {
    const userObjectId = new mongoose.Types.ObjectId(userId);
    const existingDeck = await DeckModel.findById(id);

    if (!existingDeck) {
      createAndThrowError(HTTP_STATUS.NOT_FOUND, "Deck not found");
    }

    const session = await mongoose.startSession();
    session.startTransaction();
    try {
      const deleted = await DeckModel.findOneAndDelete({
        _id: id,
        userId: userObjectId,
      }).session(session);

      if (!deleted) {
        await session.abortTransaction();
        createAndThrowError(
          HTTP_STATUS.NOT_FOUND,
          "Deck not found or you don't have permission to delete it",
        );
      }
      await CardModel.deleteMany({ deckId: id }).session(session);
      await session.commitTransaction();
      return deleted;
    } catch (err) {
      if (session.inTransaction()) {
        await session.abortTransaction();
      }
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
    const card = await CardModel.findOne({ _id: cardId, deckId: deckId });
    if (!card) {
      createAndThrowError(HTTP_STATUS.NOT_FOUND, "Card not found");
    }
    return card;
  }

  async createDeckCard(cardData, userId) {
    const userObjectId = new mongoose.Types.ObjectId(userId);

    const deck = await DeckModel.findOne({
      _id: cardData.deckId,
      userId: userObjectId,
    });
    if (!deck) {
      createAndThrowError(
        HTTP_STATUS.NOT_FOUND,
        "Deck not found or you don't have permission to add cards to it",
      );
    }
    return await CardModel.create(cardData);
  }

  async updateCard(deckId, cardId, data, userId) {
    const userObjectId = new mongoose.Types.ObjectId(userId);

    const deck = await DeckModel.findOne({ _id: deckId, userId: userObjectId });
    if (!deck) {
      createAndThrowError(
        HTTP_STATUS.NOT_FOUND,
        "Deck not found or you don't have permission to modify cards in it",
      );
    }

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

  async deleteCardByDeckAndId(deckId, cardId, userId) {
    const userObjectId = new mongoose.Types.ObjectId(userId);

    const deck = await DeckModel.findOne({ _id: deckId, userId: userObjectId });
    if (!deck) {
      createAndThrowError(
        HTTP_STATUS.NOT_FOUND,
        "Deck not found or you don't have permission to delete cards from it",
      );
    }

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
