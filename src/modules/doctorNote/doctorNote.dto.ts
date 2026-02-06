import z from '../../shared/libs/zod.lib.js';

export const doctorNoteSchema = z.object({
  id: z.uuid().openapi({ example: '3fa85f64-5717-4562-b3fc-2c963f66afa6' }),
  note: z.string().min(1).max(1000).openapi({ example: 'Patient shows improvement' }),
  doctorId: z.uuid().openapi({ example: '3fa85f64-5717-4562-b3fc-2c963f66afa6' }),
  patientId: z.uuid().openapi({ example: '3fa85f64-5717-4562-b3fc-2c963f66afa6' }),
  createdAt: z.iso.datetime().openapi({ example: '2023-10-05T14:48:00.000Z' }),
  updatedAt: z.iso.datetime().openapi({ example: '2023-10-05T14:48:00.000Z' }),
});

export const paginationQueryDto = z.object({
  page: z.coerce.number().int().min(1).default(1).openapi({ example: 1 }),
  limit: z.coerce.number().int().min(1).max(100).default(10).openapi({ example: 10 }),
});
export type PaginationQueryDto = z.infer<typeof paginationQueryDto>;

export const createDoctorNoteRequestDto = doctorNoteSchema.omit({
  id: true,
  doctorId: true,
  createdAt: true,
  updatedAt: true,
});
export type CreateDoctorNoteRequestDto = z.infer<typeof createDoctorNoteRequestDto>;

export const updateDoctorNoteRequestDto = doctorNoteSchema.pick({ note: true });
export type UpdateDoctorNoteRequestDto = z.infer<typeof updateDoctorNoteRequestDto>;

export const doctorNoteResponseDto = doctorNoteSchema;
export type DoctorNoteResponseDto = z.infer<typeof doctorNoteResponseDto>;

export const doctorNotesListResponseDto = z.object({
  doctorNotes: z.array(doctorNoteResponseDto),
  pagination: z.object({
    page: z.number(),
    limit: z.number(),
    total: z.number(),
    totalPages: z.number(),
  }),
});
export type DoctorNotesListResponseDto = z.infer<typeof doctorNotesListResponseDto>;

export const createDoctorNoteResponseDto = doctorNoteResponseDto;
export type CreateDoctorNoteResponseDto = z.infer<typeof createDoctorNoteResponseDto>;

export const updateDoctorNoteResponseDto = doctorNoteResponseDto;
export type UpdateDoctorNoteResponseDto = z.infer<typeof updateDoctorNoteResponseDto>;
