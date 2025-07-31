import express from "express";
import cardRouter from "./cards/card.router.js";
import deckRouter from "./decks/deck.router.js";
import { errorHandler } from "./middlewares/errorHandler.middleware.js";
import { notFound } from "./middlewares/notFound.middleware.js";

// Create an express server
const app = express();

// Tell express to use the json middleware
app.use(express.json());

/****** Attach routes ******/
/**
 * We use /api/ at the start of every route!
 * As we also host our client code on heroku we want to separate the API endpoints.
 */
app.use("/api/cards", cardRouter);
app.use("/api", deckRouter);
app.use(notFound);
app.use(errorHandler);

export default app;
