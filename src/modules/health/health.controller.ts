import type { Handler } from '../../shared/types/express.type.js';
import { healthResponseDTO } from './health.dto.js';
import { healthService, type HealthServiceInterface } from './health.service.js';

interface HealthControllerInterface {
  checkHealth: Handler;
}

class HealthController implements HealthControllerInterface {
  constructor(private healthService: HealthServiceInterface) {}

  checkHealth: Handler = async (_, res) => {
    const healthStatus = await this.healthService.checkHealth();
    res.ok(healthStatus, healthResponseDTO);
  };
}

export const healthController = new HealthController(healthService);
