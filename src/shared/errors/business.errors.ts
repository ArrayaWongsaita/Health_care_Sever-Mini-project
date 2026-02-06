import { AppError } from './app-error.js';

export const BUSINESS_ERROR_CODES = {
  USER_NOT_FOUND: 'USER_NOT_FOUND',
  EMAIL_ALREADY_USED: 'EMAIL_ALREADY_USED',
  VALIDATION_FAILED: 'VALIDATION_FAILED',
  NOT_FOUND: 'NOT_FOUND',
};

export const BusinessErrors = {
  userNotFound: () =>
    new AppError({
      code: BUSINESS_ERROR_CODES.USER_NOT_FOUND,
      message: 'User not found',
      statusCode: 404,
    }),

  emailAlreadyUsed: () =>
    new AppError({
      code: BUSINESS_ERROR_CODES.EMAIL_ALREADY_USED,
      message: 'Email already used',
      statusCode: 400,
    }),

  validationFailed: (issues: unknown) =>
    new AppError({
      code: BUSINESS_ERROR_CODES.VALIDATION_FAILED,
      message: 'Validation failed',
      statusCode: 400,
      details: issues,
    }),

  notFound: (message: string = 'Resource not found') =>
    new AppError({
      code: BUSINESS_ERROR_CODES.NOT_FOUND,
      message,
      statusCode: 404,
    }),
};
