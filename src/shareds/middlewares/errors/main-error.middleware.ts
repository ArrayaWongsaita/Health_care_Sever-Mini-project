import type { NextFunction, Request, Response } from "express";
import { AppError } from "../../errors/app-error.js";
import { Errors } from "../../errors/index.js";

export const mainErrorMiddleware = (
  err: unknown,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  let error: AppError = Errors.system.internal(err);

  if (err instanceof AppError) {
    error = err;
  }

  res.status(error.statusCode).json(error);
};
