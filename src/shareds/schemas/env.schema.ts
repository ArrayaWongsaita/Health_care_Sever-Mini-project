import { z } from "zod";

const nodeEnv = z.enum(["development", "production", "test"]);
const logDir = z.enum(["logs", "debug", "info", "error"]);

export const envSchema = z.object({
  // Frontend URL
  FRONTEND_URL: z.string().default("http://localhost:3000"),

  NODE_ENV: nodeEnv.default("development"),
  LOG_DIR: logDir.default("logs"),

  PORT: z.string().default("3000"),

  // Documentation
  DOCS_PATH: z.string().default("/docs"),
});
