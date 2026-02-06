import type { NextFunction, Request, Response } from 'express';

import type { RequestHandler } from 'express';
import type { TokenPayload } from '../services/token.service.js';

export type Handler<B = unknown, P = unknown, Q = unknown> = RequestHandler<
  P,
  unknown,
  B,
  Q,
  {
    user?: TokenPayload;
    validateBody?: B;
    validateParams?: P;
    validateQuery?: Q;
  }
>;
export interface ErrorRequestHandler {
  (err: Error, req: Request, res: Response, next: NextFunction): void | Promise<void>;
}
