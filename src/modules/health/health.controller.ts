import type { RequestHandler } from 'express';
import type { Handler } from '../../shared/types/express.type.js';
import { validateResponse } from '../../shared/utils/validator.utils.js';
import { healthResponseDTO } from './health.dto.js';
import { healthService } from './health.service.js';

const checkHealth: Handler = async (req, res) => {
  const data = await healthService.checkHealth();
  res.ok(validateResponse(healthResponseDTO, data));
};

export const healthController = { checkHealth };
