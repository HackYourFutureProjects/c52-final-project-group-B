// eslint-disable-next-line no-unused-vars
import { User } from "../users/user.model.js";
import { DeckModel } from "./deck.model.js";
import { CardModel } from "../cards/card.model.js";
import { HTTP_STATUS } from "../constants/httpStatus.js";

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
    if (!deck) {
      const error = new Error("Deck not found");
      error.status = HTTP_STATUS.NOT_FOUND;
      throw error;
    } else {
      const deckObj = deck.toObject();
      deckObj.userInfo = deckObj.userId;
      delete deckObj.userId;
      const count = await CardModel.countDocuments({ deckId: deck._id });
      deckObj.cardsCount = count;

      return deckObj;
    }
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
}

export default DeckService;
