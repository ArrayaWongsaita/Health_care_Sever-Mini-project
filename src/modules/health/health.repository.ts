import type { PrismaClient } from '../../infrastructure/db/generated/prisma/client.js';
import { prisma } from '../../infrastructure/db/prisma.db.js';

export interface HealthRepositoryInterface {
  checkDatabaseConnection: () => Promise<boolean>;
}

export class HealthPrismaRepository implements HealthRepositoryInterface {
  constructor(private readonly db: PrismaClient) {}
  public async checkDatabaseConnection(): Promise<boolean> {
    try {
      await this.db.$queryRaw`SELECT 1`;
      return true;
    } catch {
      return false;
    }
  }
}

export const healthRepository = new HealthPrismaRepository(prisma);
