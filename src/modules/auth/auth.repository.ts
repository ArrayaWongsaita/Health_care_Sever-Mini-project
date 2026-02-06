import type { PrismaClient, User } from '../../infrastructure/db/generated/prisma/client.js';
import { prisma } from '../../infrastructure/db/prisma.db.js';
import type { RegisterRequestDto } from './auth.dto.js';

export interface AuthRepositoryInterface {
  findUserByUsername: (username: string) => Promise<User | null>;
  findUserById: (id: string) => Promise<User | null>;
  createUser: (data: RegisterRequestDto) => Promise<User>;
}

export class AuthPrismaRepository implements AuthRepositoryInterface {
  constructor(private readonly db: PrismaClient) {}

  public async findUserByUsername(username: string): Promise<User | null> {
    return await this.db.user.findUnique({
      where: { username },
    });
  }

  public async findUserById(id: string): Promise<User | null> {
    return await this.db.user.findUnique({
      where: { id },
    });
  }

  public async createUser(data: RegisterRequestDto): Promise<User> {
    return await this.db.user.create({
      data: {
        username: data.username,
        password: data.password,
        role: data.role,
      },
    });
  }
}

export const authRepository = new AuthPrismaRepository(prisma);
