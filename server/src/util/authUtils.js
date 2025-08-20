import dotenv from "dotenv";
dotenv.config();

import jwt from "jsonwebtoken";

const ACCESS_SECRET = process.env.ACCESS_TOKEN_SECRET;
const REFRESH_SECRET = process.env.REFRESH_TOKEN_SECRET;

export const generateAccessToken = (user) => {
  return jwt.sign({ id: user._id, username: user.username }, ACCESS_SECRET, {
    expiresIn: "2h",
  });
};

export const generateRefreshToken = (user) => {
  return jwt.sign({ id: user._id }, REFRESH_SECRET, { expiresIn: "7d" });
};

export const verifyAccessToken = (token) => {
  try {
    return jwt.verify(token, ACCESS_SECRET);
  } catch {
    return false;
  }
};

export const verifyRefreshToken = (token) => {
  try {
    return jwt.verify(token, REFRESH_SECRET);
  } catch {
    return false;
  }
};

export const decodedToken = (token) => {
  return jwt.decode(token);
};
