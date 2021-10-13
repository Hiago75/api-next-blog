import { Request, Response } from 'express';
import { BadRequest } from '../../custom/errors';
import { AuthenticateUserService } from '../../services/Auth/AuthenticateUserService';
import { formatExpiration } from '../../utils/formatExpiration';

export class AuthenticateUserController {
  constructor(private authenticateUserService: AuthenticateUserService) {}

  async handle(request: Request, response: Response) {
    const { email, password } = request.body;

    if (!email || !password) throw new BadRequest('auth_email_password_missing_error');

    const { token, tokenExp, refreshTokenId, refreshTokenExpiration } = await this.authenticateUserService.execute({
      email,
      password,
    });

    const formatedRefreshTokenExpiration = formatExpiration(refreshTokenExpiration);
    const formatedTokenExpiration = formatExpiration(tokenExp);

    return response
      .status(200)
      .cookie('refresh_token', refreshTokenId, {
        httpOnly: true,
        secure: true,
        expires: formatedRefreshTokenExpiration,
        sameSite: 'strict',
        path: '/',
      })
      .cookie('access_token', token, {
        httpOnly: true,
        secure: true,
        expires: formatedTokenExpiration,
        sameSite: 'strict',
        path: '/',
      })
      .cookie('isAuthenticated', true, {
        secure: true,
        sameSite: 'strict',
        expires: formatedRefreshTokenExpiration,
        path: '/',
      })
      .send(request.t('auth_login_success'));
  }
}
