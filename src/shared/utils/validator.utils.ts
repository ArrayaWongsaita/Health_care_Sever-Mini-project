import z, { type ZodSchema } from 'zod';
import type { Handler } from '../types/express.type.js';
import { not } from './boolean.utils.js';
import { BusinessErrors } from '../errors/business.errors.js';
import { SystemErrors } from '../errors/system.errors.js';

export const validateBody =
  (schema: ZodSchema): Handler =>
  (req, _, next) => {
    const { success, error, data } = schema.safeParse(req.body);

    if (!success) {
      const details = z.flattenError(error).fieldErrors;
      throw BusinessErrors.validationFailed(details);
    } else {
      req.body = data;
      next();
    }
  };

export const validateQuery =
  (schema: ZodSchema): Handler =>
  (req, _, next) => {
    const { success, error, data } = schema.safeParse(req.query);

    if (!success) {
      const details = z.flattenError(error).fieldErrors;
      throw BusinessErrors.validationFailed(details);
    } else {
      req.query = data;
      next();
    }
  };

export const validateParams =
  (schema: ZodSchema): Handler =>
  (req, _, next) => {
    const { success, error, data } = schema.safeParse(req.params);

    if (!success) {
      const details = z.flattenError(error).fieldErrors;
      throw BusinessErrors.validationFailed(details);
    } else {
      req.params = data;
      next();
    }
  };

export const validateResponse = (schema: ZodSchema, value: unknown) => {
  const { success, error, data } = schema.safeParse(value);
  if (!success) {
    const details = z.flattenError(error).fieldErrors;
    throw SystemErrors.responseValidationFailed(details);
  }
  return data;
};
