import { Router } from "express";
import {
  addUser,
  handleGetCurrentUser,
  updateCurrentUser,
  softDeleteUser,
  loginUser,
  changePassword,
  refreshToken,
  forgetPasswordEmail,
  verifyResetToken,
  resetPassword,
} from "./user.controller.js";

const userRouter = Router();

userRouter.post("/", addUser);

userRouter.get("/me", handleGetCurrentUser);
userRouter.put("/me", updateCurrentUser);

userRouter.post("/login", loginUser);
userRouter.post("/refresh-token", refreshToken);
userRouter.put("/:userId/password", changePassword);
userRouter.post("/forget-password", forgetPasswordEmail);
userRouter.get("/reset-password/verify", verifyResetToken);
userRouter.post("/reset-password", resetPassword);
userRouter.delete("/:userId", softDeleteUser);

export default userRouter;
