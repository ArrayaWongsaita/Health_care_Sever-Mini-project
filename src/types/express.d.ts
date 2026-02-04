// src/types/express.d.ts
import "express";

declare global {
  namespace Express {
    interface Response {
      ok<T>(data: T): void;
      created<T>(data: T): void;
      noContent(): void;
    }
  }
}
