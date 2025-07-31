// import createHttpError from "http-errors";
import { CardModel } from "./card.model.js";
// import { HTTP_STATUS } from "../constants/httpStatus.js";

class CardService {
  async createCard(cardData) {
    return CardModel.create(cardData);
  }
}

export default CardService;
