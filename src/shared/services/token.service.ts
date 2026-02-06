import type { User } from '../../infrastructure/db/generated/prisma/client.js';

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
  private readonly secret = process.env.JWT_SECRET || 'your-secret-key';
  private readonly expiresIn = process.env.JWT_EXPIRES_IN || '7d';

  public async generateToken(user: User): Promise<string> {
    // For now, using a simple token generation
    // In production, use jsonwebtoken library
    const payload: TokenPayload = {
      userId: user.id,
      username: user.username,
      role: user.role,
    };

    // TODO: Implement JWT token generation with jsonwebtoken
    // const token = jwt.sign(payload, this.secret, { expiresIn: this.expiresIn });
    const token = Buffer.from(JSON.stringify(payload)).toString('base64');
    return token;
  }

  public async verifyToken(token: string): Promise<TokenPayload> {
    try {
      // TODO: Implement JWT token verification with jsonwebtoken
      // const decoded = jwt.verify(token, this.secret) as TokenPayload;
      const decoded = JSON.parse(Buffer.from(token, 'base64').toString());
      return decoded as TokenPayload;
    } catch (error) {
      throw new Error('Invalid token');
    }
  }
}

export const tokenService = new TokenService();
