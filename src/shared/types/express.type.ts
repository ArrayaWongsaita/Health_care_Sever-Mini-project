import type { NextFunction, Request, Response, RequestHandler } from 'express';

export type Handler<B = unknown, P = unknown, Q = unknown> = (
  req: Request<P, unknown, B, Q>,
  res: Response,
  next: NextFunction,
) => void | Promise<void>;
export interface ErrorRequestHandler {
  (err: Error, req: Request, res: Response, next: NextFunction): void | Promise<void>;
}
