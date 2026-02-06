import { checkBody, checkUser } from '../../shared/libs/express.lib.js';
import { validateResponse } from '../../shared/libs/validator.lib.js';
import type { TokenPayload } from '../../shared/services/token.service.js';
import type { Handler } from '../../shared/types/express.type.js';
import {
  loginResponseDto,
  meResponseDto,
  registerResponseDto,
  type LoginRequestDto,
  type RegisterRequestDto,
} from './auth.dto.js';
import { authService, type AuthServiceInterface } from './auth.service.js';

interface AuthControllerInterface {
  login: Handler<LoginRequestDto>;
  register: Handler<RegisterRequestDto>;
  getMe: Handler<TokenPayload>;
}

class AuthController implements AuthControllerInterface {
  constructor(private readonly authService: AuthServiceInterface) {}

  login: Handler<LoginRequestDto> = async (req, res) => {
    const body = checkBody(res.locals.validateBody);
    const result = await this.authService.login(body);
    res.ok(result, loginResponseDto);
  };
  register: Handler<RegisterRequestDto> = async (req, res) => {
    const body = checkBody(res.locals.validateBody);
    const result = await this.authService.register(body);
    res.created(result, registerResponseDto);
  };

  getMe: Handler<TokenPayload> = async (req, res) => {
    const { userId } = checkUser(res.locals.user);
    const result = await this.authService.getMe(userId);
    res.ok(result, meResponseDto);
  };
}

export const authController = new AuthController(authService);
