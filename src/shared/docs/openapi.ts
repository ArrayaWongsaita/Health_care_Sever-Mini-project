import { OpenApiGeneratorV3 } from '@asteasolutions/zod-to-openapi';
import { healthRegistry } from '../../modules/health/health.doc.js';
import { authRegistry } from '../../modules/auth/auth.doc.js';
import { healthRecordRegistry } from '../../modules/healthRecord/healthRecord.doc.js';
import { doctorNoteRegistry } from '../../modules/doctorNote/doctorNote.doc.js';

const registries = [healthRegistry, authRegistry, healthRecordRegistry, doctorNoteRegistry];
const definitions = registries.flatMap((registry) => registry.definitions);

const generator = new OpenApiGeneratorV3(definitions);

export const openApiSpec = generator.generateDocument({
  openapi: '3.0.0',
  info: {
    title: 'Health Care API',
    version: '1.0.0',
    description: 'API documentation for the Health Care application',
  },
});

// add  Authorize button
openApiSpec.components = {
  ...openApiSpec.components,
  securitySchemes: {
    BearerAuth: {
      type: 'http',
      scheme: 'bearer',
      bearerFormat: 'JWT',
    },
  },
};
