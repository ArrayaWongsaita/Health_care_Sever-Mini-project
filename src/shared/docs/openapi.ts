import { OpenApiGeneratorV3 } from '@asteasolutions/zod-to-openapi';
import { healthRegistry } from '../../modules/health/health.doc.js';

const registries = [healthRegistry];
const definitions = registries.flatMap((registry) => registry.definitions);

const generator = new OpenApiGeneratorV3(definitions);

export const openApiSpec = generator.generateDocument({
  openapi: '3.0.0',
  info: {
    title: 'Map Marker API',
    version: '1.0.0',
    description: 'API documentation for the Map Marker application',
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
