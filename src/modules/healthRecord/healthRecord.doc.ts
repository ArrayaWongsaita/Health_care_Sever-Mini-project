import { OpenAPIRegistry } from '@asteasolutions/zod-to-openapi';
import {
  createHealthRecordRequestDto,
  createHealthRecordResponseDto,
  healthRecordResponseDto,
  healthRecordsListResponseDto,
  paginationQueryDto,
  updateHealthRecordRequestDto,
  updateHealthRecordResponseDto,
} from './healthRecord.dto.js';
import { registerJsonBody, registerJsonResponse } from '../../shared/libs/zod-to-openapi.lib.js';
import { idParamsSchema } from '../../shared/schemas/params.schema.js';
import { ROUTES } from '../../shared/constants/routes.constant.js';

export const healthRecordRegistry = new OpenAPIRegistry();

// Register schemas
healthRecordRegistry.register('idParamsSchema', idParamsSchema);
healthRecordRegistry.register('paginationQueryDto', paginationQueryDto);
healthRecordRegistry.register('createHealthRecordRequestDto', createHealthRecordRequestDto);
healthRecordRegistry.register('updateHealthRecordRequestDto', updateHealthRecordRequestDto);
healthRecordRegistry.register('healthRecordResponseDto', healthRecordResponseDto);
healthRecordRegistry.register('healthRecordsListResponseDto', healthRecordsListResponseDto);
healthRecordRegistry.register('createHealthRecordResponseDto', createHealthRecordResponseDto);
healthRecordRegistry.register('updateHealthRecordResponseDto', updateHealthRecordResponseDto);

// GET /health-records - Get all health records
healthRecordRegistry.registerPath({
  method: 'get',
  path: ROUTES.HEALTH_RECORD.LIST.doc,
  tags: ['Health Records'],
  security: [{ BearerAuth: [] }],
  request: {
    query: paginationQueryDto,
  },
  responses: registerJsonResponse(
    healthRecordsListResponseDto,
    200,
    'List of health records retrieved successfully',
  ),
});

// GET /health-records/:id - Get specific health record
healthRecordRegistry.registerPath({
  method: 'get',
  path: ROUTES.HEALTH_RECORD.GET_BY_ID.doc,
  tags: ['Health Records'],
  security: [{ BearerAuth: [] }],
  request: {
    params: idParamsSchema,
  },
  responses: registerJsonResponse(
    healthRecordResponseDto,
    200,
    'Health record retrieved successfully',
  ),
});

// POST /health-records - Create health record
healthRecordRegistry.registerPath({
  method: 'post',
  path: ROUTES.HEALTH_RECORD.CREATE.doc,
  tags: ['Health Records'],
  security: [{ BearerAuth: [] }],
  request: {
    ...registerJsonBody(createHealthRecordRequestDto, 'Create health record request payload'),
  },
  responses: registerJsonResponse(
    createHealthRecordResponseDto,
    201,
    'Health record created successfully',
  ),
});

// PATCH /health-records/:id - Update health record
healthRecordRegistry.registerPath({
  method: 'patch',
  path: ROUTES.HEALTH_RECORD.UPDATE.doc,
  tags: ['Health Records'],
  security: [{ BearerAuth: [] }],
  request: {
    params: idParamsSchema,
    ...registerJsonBody(updateHealthRecordRequestDto, 'Update health record request payload'),
  },
  responses: registerJsonResponse(
    updateHealthRecordResponseDto,
    200,
    'Health record updated successfully',
  ),
});

// DELETE /health-records/:id - Delete health record
healthRecordRegistry.registerPath({
  method: 'delete',
  path: ROUTES.HEALTH_RECORD.DELETE.doc,
  tags: ['Health Records'],
  security: [{ BearerAuth: [] }],
  request: {
    params: idParamsSchema,
  },
  responses: {
    204: { description: 'Health record deleted successfully' },
  },
});
