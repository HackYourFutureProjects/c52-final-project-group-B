import { Router } from "express";
import { addUser } from "./user.controller.js";

const userRouter = Router();

userRouter.post("/", addUser);
// userRouter.post("/login", loginUser);

export default userRouter;
