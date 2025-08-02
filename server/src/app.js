import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

import deckRouter from "./decks/deck.router.js";
import { errorHandler } from "./middlewares/errorHandler.middleware.js";
import { notFound } from "./middlewares/notFound.middleware.js";

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const allowedOrigins = [
  "http://localhost:5173",
  "https://c52-group-b-6754f1cb75b0.herokuapp.com",
];
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
  }),
);

app.use(express.json());

app.use("/api/decks", deckRouter);

if (process.env.NODE_ENV === "production") {
  const clientBuildPath = path.resolve(__dirname, "../../client/dist");

  app.use(express.static(clientBuildPath));

  app.get("*", (req, res, next) => {
    if (req.path.startsWith("/api")) return next();
    res.sendFile(path.join(clientBuildPath, "index.html"));
  });
}

app.use(notFound);
app.use(errorHandler);

export default app;
