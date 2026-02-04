import { AppError } from "./app-error.js";
import { ERROR_CODES } from "./error-codes.js";

const AUTH_ERROR_CODES = {
  // Auth
  AUTH_INVALID_CREDENTIALS: "AUTH_INVALID_CREDENTIALS",
  AUTH_TOKEN_EXPIRED: "AUTH_TOKEN_EXPIRED",
  AUTH_UNAUTHORIZED: "AUTH_UNAUTHORIZED",
};

const invalidCredentials = () =>
  new AppError({
    code: AUTH_ERROR_CODES.AUTH_INVALID_CREDENTIALS,
    message: "Invalid email or password",
    statusCode: 401,
  });

const tokenExpired = () =>
  new AppError({
    code: AUTH_ERROR_CODES.AUTH_TOKEN_EXPIRED,
    message: "Token expired",
    statusCode: 401,
  });

const unauthorized = () =>
  new AppError({
    code: AUTH_ERROR_CODES.AUTH_UNAUTHORIZED,
    message: "Unauthorized",
    statusCode: 401,
  });

const authErrors = {
  invalidCredentials,
  tokenExpired,
  unauthorized,
};

export default authErrors;
