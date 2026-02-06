import z, { ZodObject } from 'zod';
import type { Handler } from '../types/express.type.js';
import { BusinessErrors } from '../errors/business.errors.js';
import { SystemErrors } from '../errors/system.errors.js';
import { baseSuccessResponseSchema } from '../schemas/response.schema.js';

export const validateBody =
  (schema: ZodObject): Handler =>
  (req, res, next) => {
    const { success, error, data } = schema.safeParse(req.body);

    if (!success) {
      const details = z.flattenError(error).fieldErrors;
      throw BusinessErrors.validationFailed(details);
    } else {
      res.locals.validateBody = data;
      next();
    }
  };

export const validateQuery =
  (schema: ZodObject): Handler =>
  (req, res, next) => {
    const { success, error, data } = schema.safeParse(req.query);

    if (!success) {
      const details = z.flattenError(error).fieldErrors;
      throw BusinessErrors.validationFailed(details);
    } else {
      res.locals.validateQuery = data;
      next();
    }
  };

export const validateParams =
  (schema: ZodObject): Handler =>
  (req, res, next) => {
    const { success, error, data } = schema.safeParse(req.params);

    if (!success) {
      const details = z.flattenError(error).fieldErrors;
      throw BusinessErrors.validationFailed(details);
    } else {
      res.locals.validateParams = data;
      next();
    }
  };
//

export const validateResponse = (schema: ZodObject, value: unknown) => {
  const responseSchema = baseSuccessResponseSchema.extend({
    data: schema,
  });
  const { success, error, data } = responseSchema.safeParse({
    status: 'success',
    data: value,
  });
  if (!success) {
    const details = z.flattenError(error).fieldErrors;
    throw SystemErrors.responseValidationFailed(details);
  }
  return data;
};
