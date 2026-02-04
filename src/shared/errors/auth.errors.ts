import { AppError } from './app-error.js';

export const AUTH_ERROR_CODES = {
  INVALID_CREDENTIALS: 'AUTH_INVALID_CREDENTIALS',
  TOKEN_EXPIRED: 'AUTH_TOKEN_EXPIRED',
  FORBIDDEN: 'AUTH_FORBIDDEN',
};

export const AuthErrors = {
  invalidCredentials: () =>
    new AppError({
      code: AUTH_ERROR_CODES.INVALID_CREDENTIALS,
      message: 'Invalid email or password',
      statusCode: 401,
    }),

  forbidden: () =>
    new AppError({
      code: AUTH_ERROR_CODES.FORBIDDEN,
      message: 'Access denied',
      statusCode: 403,
    }),
};
