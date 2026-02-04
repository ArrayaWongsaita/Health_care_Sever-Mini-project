import { AppError } from './app-error.js';

export const VALIDATION_ERROR_CODES = {
  VALIDATION_FAILED: 'VALIDATION_FAILED',
};

export const ValidationErrors = {
  invalidRequest: (details?: unknown) =>
    new AppError({
      code: VALIDATION_ERROR_CODES.VALIDATION_FAILED,
      message: 'Invalid request data',
      statusCode: 422,
      details,
    }),
};
