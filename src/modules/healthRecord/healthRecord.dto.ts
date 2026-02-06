import z from '../../shared/libs/zod.lib.js';

// Health Record Schema
export const healthRecordSchema = z.object({
  id: z.uuid().openapi({ example: '3fa85f64-5717-4562-b3fc-2c963f66afa6' }),
  type: z.string().min(1).max(100).openapi({ example: 'Blood Pressure' }),
  value: z.string().nullable().default(null).openapi({ example: '120/80' }),
  unit: z.string().nullable().default(null).openapi({ example: 'mmHg' }),
  note: z.string().nullable().default(null).openapi({ example: 'Normal reading' }),
  userId: z.uuid().openapi({ example: '3fa85f64-5717-4562-b3fc-2c963f66afa6' }),
  createdAt: z.iso.datetime().openapi({ example: '2023-10-05T14:48:00.000Z' }),
  updatedAt: z.iso.datetime().openapi({ example: '2023-10-05T14:48:00.000Z' }),
});

// Pagination Query DTO
export const paginationQueryDto = z.object({
  page: z.coerce.number().int().min(1).default(1).openapi({ example: 1 }),
  limit: z.coerce.number().int().min(1).max(100).default(10).openapi({ example: 10 }),
});
export type PaginationQueryDto = z.infer<typeof paginationQueryDto>;

// Request DTOs
export const createHealthRecordRequestDto = healthRecordSchema.omit({
  id: true,
  userId: true,
  createdAt: true,
  updatedAt: true,
});
export type CreateHealthRecordRequestDto = z.infer<typeof createHealthRecordRequestDto>;

export const updateHealthRecordRequestDto = healthRecordSchema.omit({
  id: true,
  userId: true,
  createdAt: true,
  updatedAt: true,
});

export type UpdateHealthRecordRequestDto = z.infer<typeof updateHealthRecordRequestDto>;

// Response DTOs
export const healthRecordResponseDto = healthRecordSchema.omit({
  userId: true,
});
export type HealthRecordResponseDto = z.infer<typeof healthRecordResponseDto>;

export const healthRecordsListResponseDto = z.object({
  healthRecords: z.array(healthRecordResponseDto),
  pagination: z.object({
    page: z.number(),
    limit: z.number(),
    total: z.number(),
    totalPages: z.number(),
  }),
});
export type HealthRecordsListResponseDto = z.infer<typeof healthRecordsListResponseDto>;

export const createHealthRecordResponseDto = healthRecordResponseDto;
export type CreateHealthRecordResponseDto = z.infer<typeof createHealthRecordResponseDto>;

export const updateHealthRecordResponseDto = healthRecordResponseDto;
export type UpdateHealthRecordResponseDto = z.infer<typeof updateHealthRecordResponseDto>;
