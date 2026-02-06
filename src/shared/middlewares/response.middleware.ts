import type { Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import type { ZodObject } from 'zod';
import { validateResponse } from '../libs/validator.lib.js';

export const responseExtend = (_req: Request, res: Response, next: NextFunction) => {
  res.ok = function <S extends ZodObject>(data: z.infer<S>, schema: S): void {
    const parsed = validateResponse(schema, data);
    this.json(parsed);
  };

  res.created = function <S extends ZodObject>(data: z.infer<S>, schema: S): void {
    const parsed = validateResponse(schema, data);
    res.status(201).json(parsed);
  };

  res.noContent = function () {
    res.status(204).send();
  };

  next();
};
