import { z } from "zod";

const nodeEnv = z.enum(["development", "production", "test"]);

export const envSchema = z.object({
  NODE_ENV: nodeEnv.default("development"),
  PORT: z.string().default("3000"),

  // Documentation
  DOCS_PATH: z.string().default("/docs"),
});
