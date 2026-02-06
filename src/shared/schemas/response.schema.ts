import z from '../libs/zod.lib.js';

export const baseSuccessResponseSchema = z.object({
  status: z.literal('success').openapi({ example: 'success' }),
  message: z.string().default('Operation successful').openapi({ example: 'Operation successful' }),
});
