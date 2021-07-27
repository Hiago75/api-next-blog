import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import { Forbidden } from '../custom/errors/Forbidden';

interface IPayload {
  sub: string;
}

// Ensure that user has logged on application before doing something
export function ensureAuthenticated(request: Request, response: Response, next: NextFunction) {
  // Try to get token from headers and
  const authToken = request.headers.authorization;
  if (!authToken) throw new Forbidden('You need to login to access this page');

  // Divide the "Bearer" word from the token itself
  const [, token] = authToken.split(' ');

  // Verify if token is valid and inject on request
  try {
    const { sub } = verify(token, process.env.TOKEN_SECRET as string) as IPayload;
    request.user_id = sub;

    return next();
  } catch (e) {
    throw new Forbidden('Invalid token');
  }
}
