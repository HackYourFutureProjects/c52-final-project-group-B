import { Router } from "express";
import { addUser, softDeleteUser, loginUser } from "./user.controller.js";

const userRouter = Router();

userRouter.post("/", addUser);
userRouter.post("/login", loginUser);
userRouter.delete("/:userId", softDeleteUser);

export default userRouter;
