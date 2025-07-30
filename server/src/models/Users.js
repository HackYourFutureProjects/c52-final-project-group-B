import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 20,
    match: /^[a-zA-Z0-9_]+$/,
  },
  email: {
    type: String,
    required: true,
    match: /^[\w.-]+@[\w.-]+\.[a-zA-Z]{2,}$/,
  },
  password: {
    type: String,
    minlength: 8,
    maxlength: 100,
    match: /^(?=.*[A-Za-z])(?=.*\d).+$/,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  profilePictureUrl: {
    type: String,
  },
});

const User = mongoose.model("User", userSchema, "users");
export default User;
