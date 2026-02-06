// src/types/express.d.ts
import 'express';

declare global {
  namespace Express {
    interface Response {
      ok<S extends ZodObject>(data: z.infer<S>, schema: S): void;

      created<S extends ZodObject>(data: z.infer<S>, schema: S): void;
      noContent(): void;
    }

    interface Request {
      user?: {
        userId: string;
        username: string;
        role: string;
      };
    }
  }
}
