import { Router } from "express";
import {
  addUser,
  handleGetUserById,
  handleUpdateUser,
} from "./user.controller.js";

const userRouter = Router();

// GET /api/users/:id
userRouter.get("/:id", handleGetUserById);

// PUT /api/users/:id
userRouter.put("/:id", handleUpdateUser);

// POST /api/users
userRouter.post("/", addUser);

export default userRouter;
