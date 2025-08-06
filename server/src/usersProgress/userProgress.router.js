import express from "express";
import { handleSubmitUserProgress } from "./userProgress.controller.js";

const router = express.Router();

router.post("/submit", handleSubmitUserProgress);

export default router;
