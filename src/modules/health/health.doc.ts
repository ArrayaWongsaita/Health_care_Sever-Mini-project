// server/src/documents/health.doc.js

import { OpenAPIRegistry } from '@asteasolutions/zod-to-openapi';
import { healthResponseDTO } from './health.dto.js';
import { ROUTES } from '../../shared/constants/routes.constant.js';

export const healthRegistry = new OpenAPIRegistry();

// add Schemas
healthRegistry.register('healthResponse', healthResponseDTO);

healthRegistry.registerPath({
  method: 'get',
  path: ROUTES.HEALTH.CHECK.doc,
  tags: ['Health'],
  responses: {
    200: {
      description: 'Successful health check response',
      content: {
        'application/json': {
          schema: healthResponseDTO,
        },
      },
    },
  },
});
