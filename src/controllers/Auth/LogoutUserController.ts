import { Request, Response } from 'express';
import { Unauthorized } from '../../shared/errors';
import { LogoutUserService } from '../../services/Auth/LogoutUserService';

export class LogoutUserController {
  constructor(private logoutUserService: LogoutUserService) { }

  async handle(request: Request, response: Response) {
    const refreshToken = request.cookies.refresh_token;

    if (!refreshToken) throw new Unauthorized('auth_token_missing_error');

    await this.logoutUserService.execute(refreshToken);

    const destroyTokenDate = new Date();

    return response
      .cookie('refresh_token', '', {
        httpOnly: true,
        secure: true,
        expires: destroyTokenDate,
        sameSite: 'strict',
        path: '/',
      })
      .cookie('access_token', '', {
        httpOnly: true,
        secure: true,
        expires: destroyTokenDate,
        sameSite: 'strict',
        path: '/',
      })
      .json({ message: request.t('auth_logout_success') });
  }
}
