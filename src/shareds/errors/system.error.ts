import { AppError } from "./app-error.js";

const SYSTEM_ERROR_CODES = {
  TECH_DATABASE_ERROR: "TECH_DATABASE_ERROR",
  TECH_INTERNAL_ERROR: "TECH_INTERNAL_ERROR",
};

const database = (err?: unknown) =>
  new AppError({
    code: SYSTEM_ERROR_CODES.TECH_DATABASE_ERROR,
    message: "Database error",
    statusCode: 500,
    details: err,
    isOperational: false,
  });

const internal = (err?: unknown) =>
  new AppError({
    code: SYSTEM_ERROR_CODES.TECH_INTERNAL_ERROR,
    message: "Internal error",
    statusCode: 500,
    details: err,
    isOperational: false,
  });

const system = {
  database,
  internal,
};

export default system;
