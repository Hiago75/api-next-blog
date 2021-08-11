import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import { Unauthorized } from '../custom/errors';
import { formatToken } from '../utils/formatToken';

interface IPayload {
  sub: string;
}

// Ensure that user has logged on application before doing something
export function ensureAuthenticated(request: Request, response: Response, next: NextFunction) {
  const authToken = request.headers.authorization;
  if (!authToken) throw new Unauthorized('necessary_login_to_proceed');

  // Split and verify the token format, then return the token only (without "Bearer")
  const token = formatToken(authToken);

  // Verify if token is valid and inject on request
  verify(token, process.env.TOKEN_SECRET as string, (error, decoded) => {
    if (error) throw new Unauthorized('auth_token_invalid_error');
    if (!decoded) throw new Error('Unexpected error');

    const { sub } = decoded as IPayload;

    request.user_id = sub;

    return next();
  });
}
