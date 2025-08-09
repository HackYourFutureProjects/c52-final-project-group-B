import { Router } from "express";
import {
  addUser,
  softDeleteUser,
  loginUser,
  refreshToken,
} from "./user.controller.js";

const userRouter = Router();

userRouter.post("/", addUser);
userRouter.post("/login", loginUser);
userRouter.post("/refresh-token", refreshToken);
userRouter.delete("/:userId", softDeleteUser);

export default userRouter;
