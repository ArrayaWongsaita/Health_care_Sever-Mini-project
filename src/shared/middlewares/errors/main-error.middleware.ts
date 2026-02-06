import type { ErrorRequestHandler } from 'express';
import { AppError } from '../../errors/app-error.js';
import { logger } from '../../logger/create.logger.js';
import { SystemErrors } from '../../errors/system.errors.js';

export const mainErrorMiddleware: ErrorRequestHandler = (err, req, res, next) => {
  console.log(err);
  let error: AppError = SystemErrors.internal();

  if (err instanceof AppError) {
    error = err;
  } else {
    logger.error('HTTP request error', {
      method: req.method,
      url: req.url,
      statusCode: error.statusCode,
      message: error.message,
      stack: error.stack,
    });
  }

  res.status(error.statusCode).json({
    status: 'error',
    code: error.code,
    message: error.message,
    details: error.details,
    isOperational: error.isOperational,
    url: req.originalUrl,
  });
};
