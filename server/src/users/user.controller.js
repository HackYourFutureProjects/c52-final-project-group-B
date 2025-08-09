import { HTTP_STATUS } from "../constants/httpStatus.js";
import UserService from "./user.service.js";
import {
  registerUserSchema,
  getUserSchema,
  updateUserSchema,
  userIdParamSchema,
  loginUserSchema,
} from "./user.schema.js";

const userService = new UserService();

// POST /api/users
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

// GET /api/users/:id
export const handleGetUserById = async (req, res) => {
  const { id } = req.params;
  const { userId } = getUserSchema.parse({ userId: id });

  const user = await userService.getUserById(userId);
  res.status(HTTP_STATUS.OK).json(user);
};

// PUT /api/users/:id
export const handleUpdateUser = async (req, res) => {
  const { id } = req.params;
  const { userId } = getUserSchema.parse({ userId: id });
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
