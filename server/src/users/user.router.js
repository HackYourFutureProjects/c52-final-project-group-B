import { Router } from "express";
import {
  addUser,
  softDeleteUser,
  loginUser,
  changePassword,
} from "./user.controller.js";

const userRouter = Router();

userRouter.post("/", addUser);
userRouter.post("/login", loginUser);
userRouter.put("/:userId/password", changePassword);
userRouter.delete("/:userId", softDeleteUser);

export default userRouter;
