import { PrismaClientKnownRequestError } from '../../../infrastructure/db/generated/prisma/internal/prismaNamespace.js';

export const PRISMA_ERROR_MAP: Record<
  PrismaClientKnownRequestError['code'],
  { status: number; message: string }
> = {
  P2000: {
    status: 400,
    message: 'Invalid input value',
  },
  P2001: {
    status: 404,
    message: 'Record not found',
  },
  P2002: {
    status: 409,
    message: 'Duplicate value',
  },
  P2003: {
    status: 409,
    message: 'Foreign key constraint failed',
  },
  P2004: {
    status: 400,
    message: 'Constraint failed',
  },
  P2025: {
    status: 404,
    message: 'Required record not found',
  },
  P1001: {
    status: 503,
    message: 'Database unreachable',
  },
  P1003: {
    status: 500,
    message: 'Database does not exist',
  },
} as const;
