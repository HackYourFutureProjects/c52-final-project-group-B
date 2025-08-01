import express from "express";
import cardRouter from "./cards/card.router.js";
import deckRouter from "./decks/deck.router.js";
import { errorHandler } from "./middlewares/errorHandler.middleware.js";
import { notFound } from "./middlewares/notFound.middleware.js";

// Create an express server
const app = express();

app.use(express.json());

app.use("/api/cards", cardRouter);
app.use("/api/decks", deckRouter);

if (process.env.NODE_ENV === "production") {
  app.use(
    express.static(new URL("../../client/dist", import.meta.url).pathname),
  );
  // Redirect * requests to give the client data
  app.get("/*file", (req, res) =>
    res.sendFile(
      new URL("../../client/dist/index.html", import.meta.url).pathname,
    ),
  );
}

app.use(notFound);
app.use(errorHandler);

export default app;
