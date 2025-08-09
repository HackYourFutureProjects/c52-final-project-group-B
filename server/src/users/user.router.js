import { Router } from "express";
import {
  addUser,
  handleGetUserById,
  handleUpdateUser,
  softDeleteUser,
  loginUser,
  changePassword,
} from "./user.controller.js";

const userRouter = Router();

// GET /api/users/:id
userRouter.get("/:id", handleGetUserById);

// PUT /api/users/:id
userRouter.put("/:id", handleUpdateUser);

// POST /api/users
userRouter.post("/", addUser);

userRouter.post("/login", loginUser);
userRouter.put("/:userId/password", changePassword);
userRouter.delete("/:userId", softDeleteUser);

export default userRouter;
