import { HTTP_STATUS } from "../constants/httpStatus.js";
import { User } from "./user.model.js";
import { createAndThrowError } from "../util/createAndThrowError.js";

export const softDeleteUser = async (req, res) => {
  const { userId } = req.params;

  const user = await User.findByIdAndUpdate(
    userId,
    { isDeleted: true },
    { new: true },
  );

  if (!user) {
    createAndThrowError(HTTP_STATUS.NOT_FOUND, "User not found");
  }

  res.status(HTTP_STATUS.OK).json({ message: "User deleted successfully" });
};
