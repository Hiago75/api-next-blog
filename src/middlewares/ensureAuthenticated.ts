import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

interface IPayload {
  sub: string;
}

// Ensure that user has logged on application before doing something
export function ensureAuthenticated(request: Request, response: Response, next: NextFunction) {
  const authToken = request.headers.authorization;

  if (!authToken) return response.status(401).send({ error: 'You need to login to access this page' });

  // Divide the "Bearer" word from the token itself and test if token have these 2 parts
  const parts = authToken.split(' ');
  if (parts.length !== 2) return response.status(401).send({ error: 'Token error' });

  // Test if the scheme is "Bearer"
  const [scheme, token] = parts;
  if (!/^Bearer$/i.test(scheme)) return response.status(401).send({ error: 'Invalid token format' });

  // Verify if token is valid and inject on request
  verify(token, process.env.TOKEN_SECRET as string, (error, decoded) => {
    if (error) return response.status(401).send({ error: 'Token is invalid' });
    if (!decoded) throw new Error('Unexpected error');

    const { sub } = decoded as IPayload;

    request.user_id = sub;

    return next();
  });
}
