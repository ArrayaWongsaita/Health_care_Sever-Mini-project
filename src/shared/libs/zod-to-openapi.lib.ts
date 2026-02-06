import type { RouteConfig } from '@asteasolutions/zod-to-openapi';
import type { ZodObject } from 'zod';
import { baseSuccessResponseSchema } from '../schemas/response.schema.js';

export const registerJsonBody = (
  schema: ZodObject,
  description: string,
): RouteConfig['request'] => ({
  body: {
    description,
    content: {
      'application/json': {
        schema,
      },
    },
  },
});

export const registerJsonResponse = (
  schema: ZodObject,
  statusCode: number,
  description: string,
): RouteConfig['responses'] => {
  const responseSchema = baseSuccessResponseSchema.extend({
    data: schema,
  });
  return {
    [statusCode]: {
      description,
      content: {
        'application/json': {
          schema: responseSchema,
        },
      },
    },
  };
};
