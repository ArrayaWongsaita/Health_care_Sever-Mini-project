import { Router } from 'express';
import { healthController } from './health.controller.js';
import { ROUTES } from '../../shared/constants/routes.constant.js';

const healthRoute = Router();

healthRoute.get(ROUTES.HEALTH.CHECK.express, healthController.checkHealth);

export { healthRoute };
