import { z } from 'zod';

const nodeEnv = z.enum(['development', 'production', 'test']);
const logDir = z.enum(['logs', 'debug', 'info', 'error']);

export const envSchema = z.object({
  // Frontend URL
  FRONTEND_URL: z.string().default('http://localhost:3000'),

  NODE_ENV: nodeEnv.default('development'),
  LOG_DIR: logDir.default('logs'),

  PORT: z.coerce.number().default(3000),

  // Documentation
  DOCS_PATH: z.string().default('/docs'),

  // Database
  DATABASE_URL: z.url(),

  JWT_SECRET: z
    .string()
    .min(32, 'JWT secret must be at least 32 characters long')
    .default('your-secret-key'),
  JWT_EXPIRES_IN: z.coerce.number().default(7 * 24 * 60 * 60), // 7 days in seconds
});
