import { OpenAPIRegistry } from '@asteasolutions/zod-to-openapi';
import {
  createDoctorNoteRequestDto,
  createDoctorNoteResponseDto,
  doctorNoteResponseDto,
  doctorNotesListResponseDto,
  paginationQueryDto,
  updateDoctorNoteRequestDto,
  updateDoctorNoteResponseDto,
} from './doctorNote.dto.js';
import { registerJsonBody, registerJsonResponse } from '../../shared/libs/zod-to-openapi.lib.js';
import { idParamsSchema } from '../../shared/schemas/params.schema.js';
import { ROUTES } from '../../shared/constants/routes.constant.js';

export const doctorNoteRegistry = new OpenAPIRegistry();

// Register schemas
doctorNoteRegistry.register('idParamsSchema', idParamsSchema);
doctorNoteRegistry.register('paginationQueryDto', paginationQueryDto);
doctorNoteRegistry.register('createDoctorNoteRequestDto', createDoctorNoteRequestDto);
doctorNoteRegistry.register('updateDoctorNoteRequestDto', updateDoctorNoteRequestDto);
doctorNoteRegistry.register('doctorNoteResponseDto', doctorNoteResponseDto);
doctorNoteRegistry.register('doctorNotesListResponseDto', doctorNotesListResponseDto);
doctorNoteRegistry.register('createDoctorNoteResponseDto', createDoctorNoteResponseDto);
doctorNoteRegistry.register('updateDoctorNoteResponseDto', updateDoctorNoteResponseDto);

// GET /doctor-notes - Get all doctor notes
doctorNoteRegistry.registerPath({
  method: 'get',
  path: ROUTES.DOCTOR_NOTE.LIST.doc,
  tags: ['Doctor Notes'],
  security: [{ BearerAuth: [] }],
  request: {
    query: paginationQueryDto,
  },
  responses: registerJsonResponse(
    doctorNotesListResponseDto,
    200,
    'List of doctor notes retrieved successfully',
  ),
});

// GET /doctor-notes/:id - Get specific doctor note
doctorNoteRegistry.registerPath({
  method: 'get',
  path: ROUTES.DOCTOR_NOTE.GET_BY_ID.doc,
  tags: ['Doctor Notes'],
  security: [{ BearerAuth: [] }],
  request: {
    params: idParamsSchema,
  },
  responses: registerJsonResponse(doctorNoteResponseDto, 200, 'Doctor note retrieved successfully'),
});

// POST /doctor-notes - Create doctor note
doctorNoteRegistry.registerPath({
  method: 'post',
  path: ROUTES.DOCTOR_NOTE.CREATE.doc,
  tags: ['Doctor Notes'],
  security: [{ BearerAuth: [] }],
  request: {
    ...registerJsonBody(createDoctorNoteRequestDto, 'Create doctor note request payload'),
  },
  responses: registerJsonResponse(
    createDoctorNoteResponseDto,
    201,
    'Doctor note created successfully',
  ),
});

// PATCH /doctor-notes/:id - Update doctor note
doctorNoteRegistry.registerPath({
  method: 'patch',
  path: ROUTES.DOCTOR_NOTE.UPDATE.doc,
  tags: ['Doctor Notes'],
  security: [{ BearerAuth: [] }],
  request: {
    params: idParamsSchema,
    ...registerJsonBody(updateDoctorNoteRequestDto, 'Update doctor note request payload'),
  },
  responses: registerJsonResponse(
    updateDoctorNoteResponseDto,
    200,
    'Doctor note updated successfully',
  ),
});

// DELETE /doctor-notes/:id - Delete doctor note
doctorNoteRegistry.registerPath({
  method: 'delete',
  path: ROUTES.DOCTOR_NOTE.DELETE.doc,
  tags: ['Doctor Notes'],
  security: [{ BearerAuth: [] }],
  request: {
    params: idParamsSchema,
  },
  responses: {
    204: { description: 'Doctor note deleted successfully' },
  },
});
