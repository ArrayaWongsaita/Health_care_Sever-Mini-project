import { prisma } from '../../infrastructure/db/prisma.db.js';
import { SystemErrors } from '../../shared/errors/system.errors.js';
import type { HealthResponseDTO } from './health.dto.js';
import { healthRepository, type HealthRepositoryInterface } from './health.repository.js';

export interface HealthServiceInterface {
  checkHealth: () => Promise<HealthResponseDTO>;
}

class HealthService implements HealthServiceInterface {
  constructor(private readonly healthRepository: HealthRepositoryInterface) {}
  public async checkHealth() {
    const isDbConnected = await this.healthRepository.checkDatabaseConnection();
    if (!isDbConnected) {
      throw SystemErrors.database();
    }

    const healthData: HealthResponseDTO = {
      uptime: process.uptime(),
      database: 'connected',
      version: process.version,
    };

    return healthData;
  }
}

export const healthService = new HealthService(healthRepository);
