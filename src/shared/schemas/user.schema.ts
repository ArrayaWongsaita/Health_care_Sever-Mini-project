import z from '../libs/zod.lib.js';

export const userRole = z.enum(['DOCTOR', 'PATIENT']).openapi('UserRole');

export const userSchema = z.object({
  id: z.uuid().openapi({ example: '3fa85f64-5717-4562-b3fc-2c963f66afa6' }),
  username: z.string().min(3).max(30).openapi({ example: 'john_doe' }),
  password: z.string().min(8).openapi({ example: '12345678' }),
  role: userRole.default('PATIENT').openapi({ example: 'PATIENT' }),
  createdAt: z.iso.datetime().openapi({ example: '2023-10-05T14:48:00.000Z' }),
  updatedAt: z.iso.datetime().optional().openapi({ example: '2023-10-05T14:48:00.000Z' }),
});
