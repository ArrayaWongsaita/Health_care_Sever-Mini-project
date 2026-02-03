// server/src/documents/health.doc.js

import { OpenAPIRegistry } from "@asteasolutions/zod-to-openapi";

export const healthRegistry = new OpenAPIRegistry();

healthRegistry.registerPath({
  method: "get",
  path: "/health",
  tags: ["Health"],
  responses: {},
});
