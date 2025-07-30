import mongoose from "mongoose";
import { cardSchema } from "./card.schema.js";

export const Card = mongoose.model("Card", cardSchema, "cards");
