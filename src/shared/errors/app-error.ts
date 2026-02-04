import type { ErrorCode } from './error-codes.js';

export class AppError extends Error {
  readonly code: ErrorCode;
  readonly statusCode: number;
  readonly isOperational: boolean;
  readonly details?: unknown;

  constructor(options: {
    code: ErrorCode;
    message: string;
    statusCode?: number;
    details?: unknown;
    isOperational?: boolean;
  }) {
    super(options.message);

    this.code = options.code;
    this.statusCode = options.statusCode ?? 400;
    this.details = options.details;
    this.isOperational = options.isOperational ?? true;

    Error.captureStackTrace(this, this.constructor);
  }
}
