import type { NextFunction, Request, Response } from 'express';

import type { RequestHandler } from 'express';

export type Handler<U = unknown, B = unknown, P = unknown, Q = unknown> = RequestHandler<
  P,
  unknown,
  B,
  Q,
  {
    user?: U;
    validateBody?: B;
    validateParams?: P;
    validateQuery?: Q;
  }
>;
export interface ErrorRequestHandler {
  (err: Error, req: Request, res: Response, next: NextFunction): void | Promise<void>;
}
