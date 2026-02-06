import { AppError } from './app-error.js';

export const AUTH_ERROR_CODES = {
  INVALID_CREDENTIALS: 'AUTH_INVALID_CREDENTIALS',
  TOKEN_EXPIRED: 'AUTH_TOKEN_EXPIRED',
  FORBIDDEN: 'AUTH_FORBIDDEN',
  USER_ALREADY_EXISTS: 'AUTH_USER_ALREADY_EXISTS',
};

export const AuthErrors = {
  invalidCredentials: () =>
    new AppError({
      code: AUTH_ERROR_CODES.INVALID_CREDENTIALS,
      message: 'Invalid username or password',
      statusCode: 401,
    }),

  forbidden: () =>
    new AppError({
      code: AUTH_ERROR_CODES.FORBIDDEN,
      message: 'Access denied',
      statusCode: 403,
    }),

  userAlreadyExists: () =>
    new AppError({
      code: AUTH_ERROR_CODES.USER_ALREADY_EXISTS,
      message: 'User already exists',
      statusCode: 409,
    }),
};
