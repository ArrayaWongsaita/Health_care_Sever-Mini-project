import type { User } from '../../infrastructure/db/generated/prisma/client.js';
import jwt from 'jsonwebtoken';
import { env } from '../config/env.config.js';

export interface TokenPayload {
  userId: string;
  username: string;
  role: string;
}

export interface TokenServiceInterface {
  generateToken: (user: User) => Promise<string>;
  verifyToken: (token: string) => Promise<TokenPayload>;
}

class TokenService implements TokenServiceInterface {
  private readonly secret = env.JWT_SECRET;
  private readonly expiresIn = env.JWT_EXPIRES_IN;

  public async generateToken(user: User): Promise<string> {
    const payload: TokenPayload = {
      userId: user.id,
      username: user.username,
      role: user.role,
    };

    try {
      const token = jwt.sign(payload as object, this.secret, { expiresIn: this.expiresIn });
      return token;
    } catch (err) {
      throw new Error('Failed to generate token');
    }
  }

  public async verifyToken(token: string): Promise<TokenPayload> {
    try {
      const decoded = jwt.verify(token, this.secret) as TokenPayload | jwt.JwtPayload;
      // jwt.verify may return JwtPayload; map to TokenPayload shape
      if (typeof decoded === 'object' && decoded !== null && 'userId' in decoded) {
        return decoded as TokenPayload;
      }
      throw new Error('Invalid token payload');
    } catch (error) {
      throw new Error('Invalid token');
    }
  }
}

export const tokenService = new TokenService();
