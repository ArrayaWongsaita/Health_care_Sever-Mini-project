import { AppError } from "./app-error.js";

const USER_ERROR_CODES = {
  // User
  USER_EMAIL_DUPLICATED: "USER_EMAIL_DUPLICATED",
  USER_NOT_FOUND: "USER_NOT_FOUND",
};

const emailDuplicated = (email: string) =>
  new AppError({
    code: USER_ERROR_CODES.USER_EMAIL_DUPLICATED,
    message: "Email already exists",
    statusCode: 400,
    details: { email },
  });

const notFound = (userId: string) =>
  new AppError({
    code: USER_ERROR_CODES.USER_NOT_FOUND,
    message: "User not found",
    statusCode: 404,
    details: { userId },
  });

const userError = {
  emailDuplicated,
  notFound,
};

export default userError;
