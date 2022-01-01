import { Request, Response, NextFunction } from 'express';
import { verify, VerifyErrors } from 'jsonwebtoken';
import { JwtPayload } from 'jwt-decode';
import { Unauthorized } from '../../../errors';

interface IPayload {
  sub: string;
}

// Ensure that user has logged on application before doing something
export function ensureAuthenticated(request: Request, response: Response, next: NextFunction) {
  const authToken = request.cookies?.access_token;

  if (!authToken) throw new Unauthorized('necessary_login_to_proceed');

  // Verify if token is valid and inject on request
  verify(
    authToken,
    process.env.TOKEN_SECRET as string,
    (error: VerifyErrors | null, decoded: JwtPayload | undefined) => {
      if (error) throw new Unauthorized('auth_token_invalid_error');
      if (!decoded) throw new Error('Unexpected error');

      const { sub } = decoded as IPayload;

      request.user_id = sub;

      return next();
    },
  );
}
