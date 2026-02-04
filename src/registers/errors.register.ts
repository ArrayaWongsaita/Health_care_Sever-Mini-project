import { type Express } from "express";
import { notFoundMiddleware } from "../shareds/middlewares/not-found.middleware.js";
import { mainErrorMiddleware } from "../shareds/middlewares/errors/main-error.middleware.js";

export const registerErrors = (app: Express) => {
  app.use(notFoundMiddleware);

  app.use(mainErrorMiddleware);
};
