import type { Handler } from '../types/express.type.js';
import { AuthErrors } from '../errors/auth.errors.js';
import { tokenService } from '../services/token.service.js';

export const authenticate: Handler = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw AuthErrors.invalidCredentials();
    }

    const token = authHeader.substring(7); // Remove 'Bearer ' prefix

    const payload = await tokenService.verifyToken(token);

    // Attach user info to request
    req.user = payload;

    next();
  } catch (error) {
    throw AuthErrors.invalidCredentials();
  }
};
