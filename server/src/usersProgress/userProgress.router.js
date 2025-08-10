import express from "express";
import { handleSubmitUserProgress } from "./userProgress.controller.js";
import { authenticate } from "../middlewares/auth.js";

const router = express.Router();

router.post("/submit", authenticate, handleSubmitUserProgress);

export default router;
