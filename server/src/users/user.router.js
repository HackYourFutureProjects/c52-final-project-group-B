import { Router } from "express";
import multer from "multer";
import {
  addUser,
  handleGetCurrentUser,
  updateCurrentUser,
  softDeleteUser,
  activateUser,
  loginUser,
  changePassword,
  refreshToken,
  forgetPasswordEmail,
  verifyResetToken,
  resetPassword,
  reportProblemEmail,
} from "./user.controller.js";
import { authenticate } from "../middlewares/auth.js";

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 },
});

const userRouter = Router();

userRouter.post("/", addUser);

userRouter.get("/me", handleGetCurrentUser);
userRouter.put("/me", upload.single("avatar"), updateCurrentUser);

userRouter.post("/login", loginUser);
userRouter.post("/refresh-token", refreshToken);

userRouter.put("/:userId/password", changePassword);
userRouter.post("/forget-password", forgetPasswordEmail);
userRouter.get("/reset-password/verify", verifyResetToken);
userRouter.post("/reset-password", resetPassword);

userRouter.delete("/deactivate", softDeleteUser);
userRouter.put("/activate", activateUser);

userRouter.post("/report-problem", authenticate, reportProblemEmail);

export default userRouter;
