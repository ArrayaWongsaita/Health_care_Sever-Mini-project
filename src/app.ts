import express from "express";
import { registerSwagger } from "./registers/swagger.register.js";

export const createApp = () => {
  const app = express();

  registerSwagger(app);

  return app;
};
