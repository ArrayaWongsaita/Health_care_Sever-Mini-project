import z from '../libs/zod.lib.js';

export const paramsSchema = z.object({
  id: z.uuid().openapi({ example: '3fa85f64-5717-4562-b3fc-2c963f66afa6' }),
});

export const idParamsSchema = paramsSchema.pick({ id: true });
export type idParams = z.infer<typeof idParamsSchema>;
