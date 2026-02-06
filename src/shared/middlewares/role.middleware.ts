import type { Handler } from '../types/express.type.js';
import { AuthErrors } from '../errors/auth.errors.js';
import type { Role } from '../../infrastructure/db/generated/prisma/enums.js';
import { checkUser } from '../libs/express.lib.js';

export const authorizeRoles = (...allowedRoles: Role[]): Handler => {
  return (req, res, next) => {
    const user = checkUser(res.locals.user);

    if (!allowedRoles.includes(user.role as Role)) {
      throw AuthErrors.forbidden();
    }

    next();
  };
};
