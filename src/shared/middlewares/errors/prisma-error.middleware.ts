import type { NextFunction, Request, Response } from 'express';

import { PrismaClientKnownRequestError } from '../../../infrastructure/db/generated/prisma/internal/prismaNamespace.js';
import { PRISMA_ERROR_MAP } from './prisma-error.map.js';
import { AppError } from '../../errors/app-error.js';
import { ERROR_CODES } from '../../errors/error-codes.js';

export const prismaErrorMiddleware = (
  err: unknown,
  _req: Request,
  _res: Response,
  next: NextFunction,
) => {
  if (err instanceof PrismaClientKnownRequestError) {
    const prismaError = PRISMA_ERROR_MAP[err.code];
    if (prismaError) {
      console.log('prismaError.message,', prismaError.message);
      throw new AppError({
        code: ERROR_CODES.TECH_DATABASE_ERROR,
        message: prismaError.message,
        statusCode: prismaError.status,
        details: err.meta ?? err.message,
      });
    } else {
      throw new AppError({
        code: ERROR_CODES.TECH_DATABASE_ERROR,
        message: 'Database error',
        statusCode: 500,
        details: err.meta ?? err.message,
      });
    }
  }

  next(err);
};
