import type { Request } from "express";
import { Errors } from "../errors/index.js";

export const notFoundMiddleware = (req: Request) => {
  throw Errors.route.notFound(req.originalUrl, req.method);
};
