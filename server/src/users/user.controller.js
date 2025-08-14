import { HTTP_STATUS } from "../constants/httpStatus.js";
import UserService from "./user.service.js";
import {
  registerUserSchema,
  updateUserSchema,
  userIdParamSchema,
  loginUserSchema,
  updatePasswordSchema,
  forgetPasswordEmailSchema,
  verifyResetTokenSchema,
  resetPasswordSchema,
  reportProblemEmailSchema,
} from "./user.schema.js";

const userService = new UserService();

export const addUser = async (req, res) => {
  const { username, email, password, profilePictureUrl } =
    registerUserSchema.parse(req.body);

  const created = await userService.createUser(
    username,
    email,
    password,
    profilePictureUrl,
  );

  res.status(HTTP_STATUS.CREATED).json(created);
};

export const handleGetCurrentUser = async (req, res) => {
  const { authorization } = req.headers;
  const user = await userService.getUserById(authorization);
  res.status(HTTP_STATUS.OK).json(user);
};

export const updateCurrentUser = async (req, res) => {
  const { authorization } = req.headers;
  const currentUser = await userService.getUserById(authorization);
  const userId =
    currentUser?._id?.toString?.() || currentUser?.id || currentUser?._id;
  const updateData = updateUserSchema.parse(req.body);
  const updated = await userService.updateUser(userId, updateData);
  res.status(HTTP_STATUS.OK).json(updated);
};

export const softDeleteUser = async (req, res) => {
  const { userId } = userIdParamSchema.parse(req.params);
  const result = await userService.softDeleteUser(userId);
  res.status(HTTP_STATUS.OK).json(result);
};

export const loginUser = async (req, res) => {
  const { email, password } = loginUserSchema.parse(req.body);
  const user = await userService.loginUser(email, password);
  res.status(HTTP_STATUS.OK).json(user);
};

export const refreshToken = async (req, res) => {
  const { refreshToken } = req.body;
  const newTokens = await userService.refreshToken(refreshToken);
  res.status(HTTP_STATUS.OK).json(newTokens);
};

export const changePassword = async (req, res) => {
  const { userId } = userIdParamSchema.parse(req.params);
  const { currentPassword, newPassword } = updatePasswordSchema.parse(req.body);

  const result = await userService.updatePassword(
    userId,
    currentPassword,
    newPassword,
  );

  res.status(HTTP_STATUS.OK).json(result);
};

export const forgetPasswordEmail = async (req, res) => {
  const { email } = forgetPasswordEmailSchema.parse(req.body);
  const result = await userService.forgetPasswordEmail(email);
  res.status(HTTP_STATUS.OK).json(result);
};

export const verifyResetToken = async (req, res) => {
  const { token } = verifyResetTokenSchema.parse(req.query);
  const result = await userService.verifyResetToken(token);
  res.status(HTTP_STATUS.OK).json(result);
};

export const resetPassword = async (req, res) => {
  const { token, newPassword } = resetPasswordSchema.parse(req.body);
  const result = await userService.resetPassword(token, newPassword);
  res.status(HTTP_STATUS.OK).json(result);
};

export const reportProblemEmail = async (req, res) => {
  if (!req.user) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const { email, subject, description, location } =
    reportProblemEmailSchema.parse(req.body);
  const result = await userService.reportProblemEmail(
    email,
    subject,
    description,
    location,
  );
  res.status(HTTP_STATUS.OK).json(result);
};
