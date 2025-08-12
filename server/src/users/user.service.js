import { User } from "./user.model.js";
import { createAndThrowError } from "../util/createAndThrowError.js";
import { hash, compare } from "bcrypt";
import { HTTP_STATUS } from "../constants/httpStatus.js";
import {
  generateAccessToken,
  verifyAccessToken,
  decodedToken,
  generateRefreshToken,
  verifyRefreshToken,
} from "../util/authUtils.js";
import resetPasswordEmailTemplate from "../emails/resetPasswordEmailTemplate.js";
import nodemailer from "nodemailer";
import crypto from "crypto";

class UserService {
  async createUser(username, email, password) {
    const usernameExists = await User.findOne({ username });
    if (usernameExists) {
      createAndThrowError(HTTP_STATUS.CONFLICT, "Username is already taken");
    }

    const emailExists = await User.findOne({ email });
    if (emailExists) {
      createAndThrowError(HTTP_STATUS.CONFLICT, "Email is already taken");
    }

    const hashedPassword = await hash(password, +process.env.SALT_ROUNDS);

    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    const publicFields = newUser.toObject();
    delete publicFields.password;

    const accessToken = generateAccessToken(publicFields);
    const refreshToken = generateRefreshToken(publicFields._id);

    return {
      userid: publicFields._id,
      username: publicFields.username,
      accessToken,
      refreshToken,
    };
  }

  async loginUser(email, password) {
    const user = await User.findOne({ email }).select("+password");
    if (!user || user.isDeleted) {
      createAndThrowError(HTTP_STATUS.UNAUTHORIZED, "Invalid credentials");
    }

    const passwordMatches = await compare(password, user.password);
    if (!passwordMatches) {
      createAndThrowError(HTTP_STATUS.UNAUTHORIZED, "Invalid credentials");
    }

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user._id);

    return {
      userid: user._id,
      username: user.username,
      accessToken,
      refreshToken,
    };
  }

  async refreshToken(token) {
    const verifyToken = verifyRefreshToken(token);
    if (!verifyToken) {
      createAndThrowError(HTTP_STATUS.UNAUTHORIZED, "Invalid refresh token");
    }

    const user = await User.findById(verifyToken.id);
    if (!user || user.isDeleted) {
      createAndThrowError(HTTP_STATUS.NOT_FOUND, "User not found");
    }

    const newAccessToken = generateAccessToken(user);
    const newRefreshToken = generateRefreshToken(user._id);

    return {
      userid: user._id,
      username: user.username,
      accessToken: newAccessToken,
      refreshToken: newRefreshToken,
    };
  }

  async softDeleteUser(userId) {
    const user = await User.findByIdAndUpdate(
      userId,
      { isDeleted: true },
      { new: true },
    );
    if (!user) {
      createAndThrowError(HTTP_STATUS.NOT_FOUND, "User not found");
    }

    return { message: "User deleted successfully" };
  }

  async getUserById(fullToken) {
    const token = fullToken.split(" ")[1];
    const validToken = verifyAccessToken(token);
    if (!validToken) {
      createAndThrowError(HTTP_STATUS.UNAUTHORIZED, "Token is not valid");
    }
    const userId = decodedToken(token)?.id;

    return await User.findById(userId);
  }

  async updatePassword(userId, currentPassword, newPassword) {
    const user = await User.findById(userId).select("+password");

    if (!user || user.isDeleted) {
      createAndThrowError(HTTP_STATUS.NOT_FOUND, "User not found");
    }

    const isMatch = await compare(currentPassword, user.password);
    if (!isMatch) {
      createAndThrowError(
        HTTP_STATUS.UNAUTHORIZED,
        "Current password is incorrect",
      );
    }

    const hashed = await hash(newPassword, +process.env.SALT_ROUNDS);
    user.password = hashed;
    await user.save();

    return { message: "Password updated successfully" };
  }

  async updateUser(userId, updateData) {
    return await User.findByIdAndUpdate(userId, updateData, {
      new: true,
      runValidators: true,
    });
  }

  async forgetPasswordEmail(email) {
    const emailExists = await User.findOne({ email });
    if (!emailExists) {
      return;
    }

    try {
      const resetToken = crypto.randomBytes(32).toString("hex");
      emailExists.resetToken = resetToken;
      emailExists.resetTokenExpiration = Date.now() + 3600000; // 1 hour
      await emailExists.save();

      const resetUrl = `https://c52b.hyf.dev/reset-password?token=${resetToken}`;
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.GOOGLE_EMAIL,
          pass: process.env.GOOGLE_APP_PASSWORD,
        },
      });

      await transporter.sendMail({
        from: `"Memix" <${process.env.GOOGLE_EMAIL}>`,
        to: email,
        subject: "[Memix] Password Reset Request",
        html: resetPasswordEmailTemplate(emailExists.username, resetUrl),
      });

      return { message: "Password reset email sent successfully" };
    } catch (error) {
      emailExists.resetToken = undefined;
      emailExists.resetTokenExpiration = undefined;
      await emailExists.save();

      createAndThrowError(
        HTTP_STATUS.INTERNAL_SERVER_ERROR,
        "Failed to send email",
      );
    }
  }
}
export default UserService;
