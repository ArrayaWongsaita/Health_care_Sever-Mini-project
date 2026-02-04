import { AppError } from "./app-error.js";

const ROUTE_ERROR_CODES = {
  // Route
  ROUTE_NOT_FOUND: "ROUTE_NOT_FOUND",
  ROUTE_NOT_ALLOWED: "ROUTE_NOT_ALLOWED",
  ROUTE_NOT_IMPLEMENTED: "ROUTE_NOT_IMPLEMENTED",
  ROUTE_NOT_SUPPORTED: "ROUTE_NOT_SUPPORTED",
};

const notFound = (path: string, method: string) =>
  new AppError({
    code: ROUTE_ERROR_CODES.ROUTE_NOT_FOUND,
    message: `Route ${method} ${path} not found`,
    statusCode: 404,
    details: { path, method },
  });

const notAllowed = (path: string, method: string) =>
  new AppError({
    code: ROUTE_ERROR_CODES.ROUTE_NOT_ALLOWED,
    message: `Route ${method} ${path} not allowed`,
    statusCode: 405,
    details: { path, method },
  });

const notImplemented = (path: string, method: string) =>
  new AppError({
    code: ROUTE_ERROR_CODES.ROUTE_NOT_IMPLEMENTED,
    message: `Route ${method} ${path} not implemented`,
    statusCode: 501,
    details: { path, method },
  });

const notSupported = (path: string, method: string) =>
  new AppError({
    code: ROUTE_ERROR_CODES.ROUTE_NOT_SUPPORTED,
    message: `Route ${method} ${path} not supported`,
    statusCode: 501,
    details: { path, method },
  });

const routeError = {
  notFound,
  notAllowed,
  notImplemented,
  notSupported,
};

export default routeError;
