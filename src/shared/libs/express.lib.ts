import type { Request, Response } from 'express';
import type { TokenPayload } from '../services/token.service.js';

export function checkUser(user: Response['locals']['user']): TokenPayload {
  if (!user) {
    throw new Error('User not authenticated');
  }
  return user;
}
export function checkBody<T>(body: T | undefined): T {
  if (!body) {
    throw new Error('Body not validated');
  }
  return body;
}

export function checkParams<T>(params: T | undefined): T {
  if (!params) {
    throw new Error('Params not validated');
  }

  return params;
}

export function checkQuery<T>(query: T | undefined): T {
  if (!query) {
    throw new Error('Query not validated');
  }

  return query;
}
