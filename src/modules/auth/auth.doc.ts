import { OpenAPIRegistry } from '@asteasolutions/zod-to-openapi';
import {
  loginRequestDto,
  loginResponseDto,
  meResponseDto,
  registerRequestDto,
  registerResponseDto,
} from './auth.dto.js';
import { registerJsonBody, registerJsonResponse } from '../../shared/libs/zod-to-openapi.lib.js';
import { paramsSchema } from '../../shared/schemas/params.schema.js';
import { ROUTES } from '../../shared/constants/routes.constant.js';

export const authRegistry = new OpenAPIRegistry();

// add Schemas
// params schema
authRegistry.register('paramsSchema', paramsSchema);
// request DTOs
authRegistry.register('loginRequestDto', loginRequestDto);
authRegistry.register('registerRequestDto', registerRequestDto);
// response DTOs
authRegistry.register('loginResponseDto', loginResponseDto);
authRegistry.register('registerResponseDto', registerResponseDto);

authRegistry.registerPath({
  method: 'post',
  path: '/auth/login',
  tags: ['Auth'],
  request: {
    ...registerJsonBody(loginRequestDto, 'Login request payload'),
  },
  responses: registerJsonResponse(loginResponseDto, 200, 'Login response payload'),
});

authRegistry.registerPath({
  method: 'post',
  path: ROUTES.AUTH.REGISTER.doc,
  tags: ['Auth'],
  request: {
    ...registerJsonBody(registerRequestDto, 'Register request payload'),
  },
  responses: registerJsonResponse(registerResponseDto, 201, 'Register response payload'),
});

authRegistry.registerPath({
  method: 'get',
  path: ROUTES.AUTH.ME.doc,
  tags: ['Auth'],
  security: [{ BearerAuth: [] }],
  responses: registerJsonResponse(meResponseDto, 200, 'Get Me response payload'),
});
