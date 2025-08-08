import { HTTP_STATUS } from "../constants/httpStatus.js";
import { verifyAccessToken } from "../util/authUtils.js";
import { createAndThrowError } from "../util/createAndThrowError.js";

export const authenticate = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader?.split(" ")[1];

  if (!token) {
    return next(
      createAndThrowError(HTTP_STATUS.UNAUTHORIZED, "Token required"),
    );
  }

  try {
    const user = verifyAccessToken(token);
    req.user = user;
    next();
  } catch (err) {
    return next(
      createAndThrowError(HTTP_STATUS.FORBIDDEN, "Invalid or expired token"),
    );
  }
};
