import express from "express";
import { registerSwagger } from "./registers/swagger.register.js";
import { registerMiddleware } from "./registers/middleware.register.js";
import { registerErrors } from "./registers/errors.register.js";

export const createApp = () => {
  const app = express();
  registerMiddleware(app);

  registerSwagger(app);
  registerErrors(app);
  return app;
};
