import { CookieOptions, Request, Response } from 'express';
import { BadRequest } from '../../shared/errors';
import { AuthenticateUserService } from '../../services/Auth/AuthenticateUserService';
import { formatExpiration } from '../../shared/utils/formatExpiration';

export class AuthenticateUserController {
  constructor(private authenticateUserService: AuthenticateUserService) {
    if (!process.env.APP_DOMAIN) throw new BadRequest('Erro nas configurações locais');
  }

  async handle(request: Request, response: Response) {
    const { email, password } = request.body;

    if (!email || !password) throw new BadRequest('auth_email_password_missing_error');

    const { token, tokenExp, refreshTokenId, refreshTokenExpiration } = await this.authenticateUserService.execute({
      email,
      password,
    });

    const formatedRefreshTokenExpiration = formatExpiration(refreshTokenExpiration);
    const formatedTokenExpiration = formatExpiration(tokenExp);

    const cookieOptions: CookieOptions = {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      path: '/',
      domain: process.env.NODE_ENV === 'production' ? process.env.APP_DOMAIN : undefined,
    };

    return response
      .status(200)
      .cookie('refresh_token', refreshTokenId, { ...cookieOptions, expires: formatedRefreshTokenExpiration })
      .cookie('access_token', token, {
        ...cookieOptions,
        expires: formatedTokenExpiration,
      })
      .cookie('isAuthenticated', true, {
        ...cookieOptions,
        httpOnly: false,
        expires: formatedRefreshTokenExpiration,
      })
      .send(request.t('auth_login_success'));
  }
}
