// eslint-disable-next-line no-unused-vars
import { User } from "../users/user.model.js"; //do not delete!!!
import mongoose from "mongoose";
import { DeckModel } from "./deck.model.js";
import { CardModel } from "../cards/card.model.js";
import { HTTP_STATUS } from "../constants/httpStatus.js";
import { createAndThrowError } from "../util/createAndThrowError.js";
import decksFilterPipeline from "./decksFilterPipeline.js";

class DeckService {
  async getDecks({
    page,
    limit,
    search,
    language,
    minCards,
    maxCards,
    sortBy,
  } = {}) {
    const pageNumber = Math.max(1, Number(page));
    const pageSize = Math.min(100, Math.max(1, Number(limit)));
    const skip = (pageNumber - 1) * pageSize;

    const pipeline = decksFilterPipeline({
      search,
      language,
      minCards,
      maxCards,
      sortBy,
    });

    pipeline.push({
      $facet: {
        meta: [{ $count: "total" }],
        items: [{ $skip: skip }, { $limit: pageSize }],
      },
    });

    const [res] = await DeckModel.aggregate(pipeline).collation({
      locale: "en",
      strength: 2,
    });
    const total = res?.meta?.[0]?.total ?? 0;
    const decks = res?.items ?? [];

    return {
      items: decks,
      total,
      pages: Math.ceil(total / pageSize) || 1,
    };
  }

  async getMyDecks(
    userId,
    { page, limit, search, language, minCards, maxCards, sortBy } = {},
  ) {
    const pageNumber = Math.max(1, Number(page));
    const pageSize = Math.min(100, Math.max(1, Number(limit)));
    const skip = (pageNumber - 1) * pageSize;

    const escapeRegExp = (s = "") => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const match = {
      userId: new mongoose.Types.ObjectId(userId),
    };

    if (language) {
      let langs = [];
      if (Array.isArray(language)) {
        langs = language.map((l) => String(l).trim()).filter(Boolean);
      } else if (typeof language === "string" && language.trim() !== "") {
        langs = language
          .split(",")
          .map((l) => l.trim())
          .filter(Boolean);
      }
      if (langs.length === 1) {
        // one language: any deck that contains it
        match.language = { $in: langs };
      } else if (langs.length > 1) {
        // multiple languages: deck must contain all
        match.language = { $all: langs };
      }
    }

    const pipeline = [
      { $match: match },
      {
        $lookup: {
          from: "cards",
          localField: "_id",
          foreignField: "deckId",
          as: "cards",
        },
      },
      { $addFields: { cardsCount: { $size: "$cards" } } },
    ];

    if (typeof minCards === "number" || typeof maxCards === "number") {
      pipeline.push({
        $match: {
          cardsCount: {
            $gte: Number.isFinite(minCards) ? minCards : 0,
            $lte: Number.isFinite(maxCards) ? maxCards : 300,
          },
        },
      });
    }

    if (search && search.trim() !== "") {
      const regex = new RegExp(escapeRegExp(search.trim()), "i");
      pipeline.push({
        $match: {
          $or: [
            { title: { $regex: regex } },
            { description: { $regex: regex } },
            { "cards.question": { $regex: regex } },
            { "cards.answer": { $regex: regex } },
          ],
        },
      });
    }

    // Sort options (fix ascending/descending semantics)
    const sortOptions = {
      mostRecent: { createdAt: -1 },
      oldest: { createdAt: 1 },
      numCardsAsc: { cardsCount: -1 },
      numCardsDesc: { cardsCount: 1 },
    };
    pipeline.push({ $sort: sortOptions[sortBy] || sortOptions.mostRecent });

    pipeline.push({
      $project: {
        cards: 0,
        userId: 0,
      },
    });

    pipeline.push({
      $facet: {
        meta: [{ $count: "total" }],
        items: [{ $skip: skip }, { $limit: pageSize }],
      },
    });

    const [res] = await DeckModel.aggregate(pipeline).collation({
      locale: "en",
      strength: 2,
    });
    const total = res?.meta?.[0]?.total ?? 0;
    const decks = res?.items ?? [];
    return { items: decks, total, pages: Math.ceil(total / pageSize) || 1 };
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
    const cards = await CardModel.find({ deckId: id }).sort({ order: 1 });
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
