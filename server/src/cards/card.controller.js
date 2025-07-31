import { HTTP_STATUS } from "../constants/httpStatus.js";
import { validateRequestBody } from "../util/validateAllowedFields.js";
import { cardValidationSchema } from "./card.schema.js";
import CardService from "./card.service.js";

const cardService = new CardService();

export const createCard = async (req, res) => {
  const cardData = validateRequestBody(cardValidationSchema, req);
  const card = await cardService.createCard(cardData);
  res.status(HTTP_STATUS.CREATED).json(card);
};

// export const getCardsByDeck = async (req, res) => {
// 	const {deckId} = validateRequestParams(cardValidationSchema, req);

// };
