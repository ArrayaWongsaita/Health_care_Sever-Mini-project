import { env } from '../config/env.config.js';
import { AppError } from './app-error.js';

export const SYSTEM_ERROR_CODES = {
  DATABASE_ERROR: 'DATABASE_ERROR',
  INTERNAL_ERROR: 'INTERNAL_ERROR',
  ROUTE_NOT_FOUND: 'ROUTE_NOT_FOUND',
  RESPONSE_VALIDATION_FAILED: 'RESPONSE_VALIDATION_FAILED',
  SERVICE_UNAVAILABLE: 'SERVICE_UNAVAILABLE',
};

export const SystemErrors = {
  database: (err?: unknown) =>
    new AppError({
      code: SYSTEM_ERROR_CODES.DATABASE_ERROR,
      message: 'Database error',
      statusCode: 500,
      isOperational: false,
      details: err,
    }),

  internal: (err?: unknown) =>
    new AppError({
      code: SYSTEM_ERROR_CODES.INTERNAL_ERROR,
      message: 'Internal server error',
      statusCode: 500,
      isOperational: false,
      details: err,
    }),

  routeNotFound: (url: string, method: string) =>
    new AppError({
      code: SYSTEM_ERROR_CODES.ROUTE_NOT_FOUND,
      message: `Route not found: [${method}] ${url}`,
      statusCode: 404,
    }),

  responseValidationFailed: (details?: unknown) =>
    new AppError({
      code: SYSTEM_ERROR_CODES.RESPONSE_VALIDATION_FAILED,
      message: 'Unexpected server response format',
      statusCode: 500,
      isOperational: false,
      details: env.NODE_ENV === 'development' ? details : undefined,
    }),

  serviceUnavailable: () =>
    new AppError({
      code: SYSTEM_ERROR_CODES.SERVICE_UNAVAILABLE,
      message: 'Service is currently unavailable',
      statusCode: 503,
      isOperational: false,
    }),
};
