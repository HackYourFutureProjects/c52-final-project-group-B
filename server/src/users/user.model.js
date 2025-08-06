import mongoose from "mongoose";

export const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      minlength: 3,
      maxlength: 20,
      match: /^[a-zA-Z0-9_]+$/,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
      maxlength: 255,
      select: false,
    },
    profilePictureUrl: {
      type: String,
    },
  },
  {
    timestamps: true,
  },
);

export const User = mongoose.model("User", userSchema, "users");
