import { Router } from 'express';
import { validateBody, validateParams, validateQuery } from '../../shared/libs/validator.lib.js';
import {
  createHealthRecordRequestDto,
  paginationQueryDto,
  updateHealthRecordRequestDto,
} from './healthRecord.dto.js';
import { healthRecordController } from './healthRecord.controller.js';
import { authenticate } from '../../shared/middlewares/auth.middleware.js';
import { idParamsSchema } from '../../shared/schemas/params.schema.js';
import { ROUTES } from '../../shared/constants/routes.constant.js';

const healthRecordRoute = Router();

// All routes require authentication
healthRecordRoute.use(authenticate);

// GET /health-records - Get all health records for current user
healthRecordRoute.get(
  ROUTES.HEALTH_RECORD.LIST.express,
  validateQuery(paginationQueryDto),
  healthRecordController.getAll,
);

// GET /health-records/:id - Get specific health record
healthRecordRoute.get(
  ROUTES.HEALTH_RECORD.GET_BY_ID.express,
  validateParams(idParamsSchema),
  healthRecordController.getById,
);

// POST /health-records - Create new health record
healthRecordRoute.post(
  ROUTES.HEALTH_RECORD.CREATE.express,
  validateBody(createHealthRecordRequestDto),
  healthRecordController.create,
);

// PATCH /health-records/:id - Update health record
healthRecordRoute.patch(
  ROUTES.HEALTH_RECORD.UPDATE.express,
  validateParams(idParamsSchema),
  validateBody(updateHealthRecordRequestDto),
  healthRecordController.update,
);

// DELETE /health-records/:id - Delete health record
healthRecordRoute.delete(
  ROUTES.HEALTH_RECORD.DELETE.express,
  validateParams(idParamsSchema),
  healthRecordController.delete,
);

export { healthRecordRoute };
