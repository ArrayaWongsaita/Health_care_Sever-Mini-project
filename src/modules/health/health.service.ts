import { prisma } from '../../infrastructure/db/prisma.db.js';
import { SystemErrors } from '../../shared/errors/system.errors.js';

const checkHealth = async () => {
  try {
    await prisma.$queryRaw`SELECT 1`;
  } catch {
    throw SystemErrors.database();
  }

  const healthData = {
    uptime: process.uptime(),
    database: 'connected',
    version: '1.0.0',
  };

  return healthData;
};

export const healthService = { checkHealth };
