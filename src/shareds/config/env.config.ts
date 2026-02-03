import "dotenv/config";
import { envSchema } from "../schemas/env.schema.js";
import z from "zod";

const { success, error, data } = envSchema.safeParse(process.env);

if (!success) {
  console.error(z.prettifyError(error));
  process.exit(1);
}

export const env = data;
