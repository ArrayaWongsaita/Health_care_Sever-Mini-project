import { mainErrorMiddleware } from './shared/middlewares/errors/main-error.middleware.js';
import { requestLogger } from './shared/middlewares/requestLogger.middleware.js';
import { responseExtend } from './shared/middlewares/response.middleware.js';
import { notFoundMiddleware } from './shared/middlewares/not-found.middleware.js';
import { openApiSpec } from './shared/docs/openapi.js';
import { env } from './shared/config/env.config.js';
import swaggerUi from 'swagger-ui-express';
import express from 'express';
import cors from 'cors';
import { healthRoute } from './modules/health/health.route.js';

const app = express();
// middleware registrations
// Enable CORS for all routes
app.use(cors({ origin: env.FRONTEND_URL }));
app.use(express.json());
app.use(requestLogger);
app.use(responseExtend);

// documentation
if (env.NODE_ENV === 'development')
  app.use(env.DOCS_PATH, swaggerUi.serve, swaggerUi.setup(openApiSpec));

// register Routes

app.use(healthRoute);

app.use(notFoundMiddleware);

// error handling registrations

app.use(mainErrorMiddleware);

export default app;
