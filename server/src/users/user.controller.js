import { HTTP_STATUS } from "../constants/httpStatus.js";
import UserService from "./user.service.js";
import { registerUserSchema } from "./user.schema.js";

const userService = new UserService();

export const addUser = async (req, res) => {
  const { username, email, password } = registerUserSchema.parse(req.body);
  const newUser = await userService.createUser(username, email, password);
  res.status(HTTP_STATUS.CREATED).json(newUser);
};
