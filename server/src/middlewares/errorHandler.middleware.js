import { ZodError } from "zod";

// eslint-disable-next-line no-unused-vars
export const errorHandler = (err, req, res, next) => {
  const isZodError = err instanceof ZodError;
  const status = isZodError ? 400 : (err.status ?? 500);

  const responseBody = isZodError
    ? { message: "Validation failed", errors: err.format() }
    : { message: err.message || "Internal Server Error hello yana" };

  res.status(status).json(responseBody);
};
