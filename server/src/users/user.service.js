import { User } from "./user.model.js";
import { createAndThrowError } from "../util/createAndThrowError.js";
import { hash, compare } from "bcrypt";
import { HTTP_STATUS } from "../constants/httpStatus.js";
import { generateAccessToken } from "../util/authUtils.js";

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
    return publicFields;
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

    return accessToken;
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
}

export default UserService;
