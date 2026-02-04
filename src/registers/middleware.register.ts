import { env } from "../shareds/config/env.config.js";
import { json, type Express } from "express";
import morgan from "morgan";
import cors from "cors";
import { requestLogger } from "../shareds/middlewares/requestLogger.middleware.js";
import { responseExtend } from "../shareds/http/response.extend.js";

export const registerMiddleware = (app: Express) => {
  // Enable CORS for all routes
  app.use(cors({ origin: env.FRONTEND_URL }));

  // Enable JSON parsing for all routes
  app.use(json());

  // Enable logging for all routes
  // app.use(morgan("dev"));
  app.use(requestLogger);

  app.use(responseExtend);
};
