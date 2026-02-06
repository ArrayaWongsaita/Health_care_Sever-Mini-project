import { Router } from 'express';
import { validateBody } from '../../shared/libs/validator.lib.js';
import { loginRequestDto, registerRequestDto } from './auth.dto.js';
import { ROUTES } from '../../shared/constants/routes.constant.js';
import { authController } from './auth.controller.js';
import { authenticate } from '../../shared/middlewares/auth.middleware.js';

const authRoute = Router();

authRoute.post(ROUTES.AUTH.LOGIN.express, validateBody(loginRequestDto), authController.login);

authRoute.post(
  ROUTES.AUTH.REGISTER.express,
  validateBody(registerRequestDto),
  authController.register,
);

authRoute.get(ROUTES.AUTH.ME.express, authenticate, authController.getMe);

export { authRoute };
