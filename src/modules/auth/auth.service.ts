import { AuthErrors } from '../../shared/errors/auth.errors.js';
import { hashService, type HashServiceInterface } from '../../shared/services/hash.service.js';
import { tokenService, type TokenServiceInterface } from '../../shared/services/token.service.js';
import type {
  LoginRequestDto,
  LoginResponseDto,
  MeResponseDto,
  RegisterRequestDto,
  RegisterResponseDto,
} from './auth.dto.js';
import { authRepository, type AuthRepositoryInterface } from './auth.repository.js';

export interface AuthServiceInterface {
  login: (data: LoginRequestDto) => Promise<LoginResponseDto>;
  register: (data: RegisterRequestDto) => Promise<RegisterResponseDto>;
  getMe: (userId: string) => Promise<MeResponseDto>;
}

class AuthService implements AuthServiceInterface {
  constructor(
    private readonly authRepository: AuthRepositoryInterface,
    private readonly hashService: HashServiceInterface,
    private readonly tokenService: TokenServiceInterface,
  ) {}

  public async login(data: LoginRequestDto): Promise<LoginResponseDto> {
    // Find user by username
    const user = await this.authRepository.findUserByUsername(data.username);
    if (!user) {
      throw AuthErrors.invalidCredentials();
    }

    // Verify password
    const isPasswordValid = await this.hashService.compare(data.password, user.password);
    if (!isPasswordValid) {
      throw AuthErrors.invalidCredentials();
    }

    // Generate token
    const token = await this.tokenService.generateToken(user);

    return {
      token,
      user: {
        id: user.id,
        username: user.username,
        role: user.role,
      },
    };
  }

  public async register(data: RegisterRequestDto): Promise<RegisterResponseDto> {
    // Check if user already exists
    const existingUser = await this.authRepository.findUserByUsername(data.username);
    if (existingUser) {
      throw AuthErrors.userAlreadyExists();
    }

    // Hash password
    const hashedPassword = await this.hashService.hash(data.password);

    // Create user
    const user = await this.authRepository.createUser({
      ...data,
      password: hashedPassword,
    });

    return {
      message: 'Registration successful',
      user: {
        id: user.id,
        username: user.username,
        role: user.role,
      },
    };
  }

  public async getMe(userId: string): Promise<MeResponseDto> {
    const user = await this.authRepository.findUserById(userId);
    if (!user) {
      throw AuthErrors.invalidCredentials();
    }

    return {
      id: user.id,
      username: user.username,
      role: user.role,
      createdAt: user.createdAt.toISOString(),
      updatedAt: user.updatedAt.toISOString(),
    };
  }
}

export const authService = new AuthService(authRepository, hashService, tokenService);
