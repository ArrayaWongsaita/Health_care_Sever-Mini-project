import { Router } from 'express';
import { healthController } from './health.controller.js';
import type { Handler } from '../../shared/types/express.type.js';

const healthRoute = Router();

healthRoute.get('/health', healthController.checkHealth);

export { healthRoute };
