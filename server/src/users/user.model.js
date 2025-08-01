import mongoose from "mongoose";
import { userSchema } from "./user.schema.js";

export const User = mongoose.model("User", userSchema, "users");
