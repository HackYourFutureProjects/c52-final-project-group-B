import { Router } from "express";
import { softDeleteUser } from "./user.controller.js";

const userRouter = Router();

userRouter.delete("/:userId", softDeleteUser);

export default userRouter;
