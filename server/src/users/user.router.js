import { Router } from "express";
import { addUser, softDeleteUser } from "./user.controller.js";

const userRouter = Router();

userRouter.post("/", addUser);
userRouter.delete("/:userId", softDeleteUser);

export default userRouter;
