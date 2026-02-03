// registers/register-swagger.ts
import { type Express } from "express";
import swaggerUi from "swagger-ui-express";
import { openApiSpec } from "../shareds/docs/openapi.js";
import { env } from "../shareds/config/env.config.js";

export const registerSwagger = (app: Express) => {
  if (env.NODE_ENV === "development") {
    app.use(env.DOCS_PATH, swaggerUi.serve, swaggerUi.setup(openApiSpec));
    console.log(
      `🚀 Swagger UI available at http://localhost:${env.PORT}${env.DOCS_PATH}`,
    );
  }
};
