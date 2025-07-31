import express from "express";
import cardRouter from "./cards/card.router.js";
// import { errorHandler } from "./middlewares/errorHandler.middleware.js";
// import { notFound } from "./middlewares/notFound.middleware.js";

// Create an express server
const app = express();

app.use(express.json());

app.use("/api/cards", cardRouter);
// app.use(notFound);
// app.use(errorHandler);

export default app;
