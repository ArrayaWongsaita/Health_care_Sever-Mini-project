import z from '../../shared/libs/zod.lib.js';
import { userSchema } from '../../shared/schemas/user.schema.js';

// request DTOs

export const loginRequestDto = userSchema.pick({
  username: true,
  password: true,
});
export type LoginRequestDto = z.infer<typeof loginRequestDto>;

export const registerRequestDto = userSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});
export type RegisterRequestDto = z.infer<typeof registerRequestDto>;

// response DTOs

export const loginResponseDto = z.object({
  token: z.string().describe('JWT authentication token'),
  user: userSchema.pick({
    id: true,
    username: true,
    role: true,
  }),
});
export type LoginResponseDto = z.infer<typeof loginResponseDto>;

export const registerResponseDto = z.object({
  message: z.string().describe('Registration success message'),
  user: userSchema.pick({
    id: true,
    username: true,
    role: true,
  }),
});
export type RegisterResponseDto = z.infer<typeof registerResponseDto>;

export const meResponseDto = userSchema.pick({
  id: true,
  username: true,
  role: true,
  createdAt: true,
  updatedAt: true,
});
export type MeResponseDto = z.infer<typeof meResponseDto>;
