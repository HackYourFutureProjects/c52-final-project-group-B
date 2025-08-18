import express from "express";
import {
  handleSubmitUserProgress,
  handleGetUserProgress,
} from "./userProgress.controller.js";
import { authenticate } from "../middlewares/auth.js";

const router = express.Router();

router.post("/submit", authenticate, handleSubmitUserProgress);
router.get("/:deckId", authenticate, handleGetUserProgress);

export default router;
