import type { Request } from 'express';
import { SystemErrors } from '../errors/system.errors.js';

export const notFoundMiddleware = (req: Request) => {
  throw SystemErrors.routeNotFound(req.originalUrl, req.method);
};
