import { HTTP_STATUS } from "../constants/httpStatus.js";
import UserService from "./user.service.js";
import {
  registerUserSchema,
  userIdParamSchema,
  loginUserSchema,
  updatePasswordSchema,
} from "./user.schema.js";

const userService = new UserService();

export const addUser = async (req, res) => {
  const { username, email, password } = registerUserSchema.parse(req.body);
  const newUser = await userService.createUser(username, email, password);
  res.status(HTTP_STATUS.CREATED).json(newUser);
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
