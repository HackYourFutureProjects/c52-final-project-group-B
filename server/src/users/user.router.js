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
  reportProblemEmail,
} from "./user.controller.js";
import { authenticate } from "../middlewares/auth.js";

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

userRouter.post("/report-problem", authenticate, reportProblemEmail);

export default userRouter;
