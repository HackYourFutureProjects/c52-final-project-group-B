import mongoose from "mongoose";
import { userProgressSchema } from "./userProgress.schema.js";

const UserProgress = mongoose.model(
  "UserProgress",
  userProgressSchema,
  "users_progress",
);
export default UserProgress;
