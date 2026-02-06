import { createRoute } from '../utils/route-builder.util.js';

export const ROUTES = {
  AUTH: {
    LOGIN: createRoute('/auth/login'),
    REGISTER: createRoute('/auth/register'),
    ME: createRoute('/auth/me'),
  },
  HEALTH: {
    CHECK: createRoute('/health'),
  },
  HEALTH_RECORD: {
    CREATE: createRoute('/health-records'),
    LIST: createRoute('/health-records'),
    DELETE: createRoute('/health-records/:id'),
    UPDATE: createRoute('/health-records/:id'),
    GET_BY_ID: createRoute('/health-records/:id'),
  },
  DOCTOR_NOTE: {
    CREATE: createRoute('/doctor-notes'),
    LIST: createRoute('/doctor-notes'),
    DELETE: createRoute('/doctor-notes/:id'),
    UPDATE: createRoute('/doctor-notes/:id'),
    GET_BY_ID: createRoute('/doctor-notes/:id'),
  },
} as const;
