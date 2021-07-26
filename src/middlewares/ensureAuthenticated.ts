import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import { Forbidden } from '../custom/errors/Forbidden';

interface IPayload {
  sub: string;
}

export function ensureAuthenticated(request: Request, response: Response, next: NextFunction) {
  const authToken = request.headers.authorization;

  if (!authToken) throw new Forbidden('You need to login to access this page');

  const [, token] = authToken.split(' ');

  try {
    const { sub } = verify(token, process.env.TOKEN_SECRET as string) as IPayload;

    request.user_id = sub;

    return next();
  } catch (e) {
    throw new Forbidden('Invalid token');
  }
}
