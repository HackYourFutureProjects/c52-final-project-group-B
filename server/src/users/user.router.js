import { Router } from "express";
import {
  addUser,
  handleGetCurrentUser,
  updateCurrentUser,
  softDeleteUser,
  loginUser,
  changePassword,
  refreshToken,
} from "./user.controller.js";

const userRouter = Router();

userRouter.post("/", addUser);

userRouter.get("/me", handleGetCurrentUser);
userRouter.put("/me", updateCurrentUser);

userRouter.post("/login", loginUser);
userRouter.post("/refresh-token", refreshToken);
userRouter.put("/:userId/password", changePassword);
userRouter.delete("/:userId", softDeleteUser);

export default userRouter;
