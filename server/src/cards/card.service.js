// import createHttpError from "http-errors";
import { CardModel } from "./card.model.js";
// import { HTTP_STATUS } from "../constants/httpStatus.js";

//service only for db call and get data, send to controller
class CardService {
  async createCard(cardData) {
    return CardModel.create(cardData);
  }

  // async getCardByDeck(deckId) {
  // 	const
  //   if (!deck) {
  //     createHttpError(HTTP_STATUS.NOT_FOUND, "Deck not found");
  //   }
  //   return await CardModel.find({ deckId });
  // }
}

export default CardService;
