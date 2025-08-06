import { User } from "./user.model.js";
import { createAndThrowError } from "../util/createAndThrowError.js";
import { hash } from "bcrypt";

class UserService {
  async createUser(username, email, password) {
    const usernameExists = await User.findOne({ username });
    if (usernameExists) {
      createAndThrowError(409, "Username is already taken");
    }

    const emailExists = await User.findOne({ email });
    if (emailExists) {
      createAndThrowError(409, "Email is already taken");
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

  // async loginUser(name, password) {
  //   const user = fakeDb.getAll("users").find((user) => user.name === name);

  //   if (!user || !(await compare(password, user.password))) {
  //     createErrorAndThrow("Authentication failed", 401);
  //   }

  //   const payload = { id: user.id };
  //   const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
  //     expiresIn: "15m",
  //   });

  //   return accessToken;
  // }
}

export default UserService;
