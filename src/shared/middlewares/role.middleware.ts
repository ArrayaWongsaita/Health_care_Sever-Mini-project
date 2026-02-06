import type { Handler } from '../types/express.type.js';
import { AuthErrors } from '../errors/auth.errors.js';
import type { Role } from '../../infrastructure/db/generated/prisma/enums.js';
import { checkUser } from '../libs/express.lib.js';

export const authorizeRoles = (...allowedRoles: Role[]): Handler => {
  return (req, _res, next) => {
    const user = checkUser(req.user);

    if (!allowedRoles.includes(user.role as Role)) {
      throw AuthErrors.forbidden();
    }

    next();
  };
};
