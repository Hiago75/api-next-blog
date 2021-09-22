import { Request, Response } from 'express';
import { Unauthorized } from '../../custom/errors';
import { RefreshUserTokenService } from '../../services/Auth/RefreshUserTokenService';
import { formatExpiration } from '../../utils/formatExpiration';

export class RefreshUserTokenController {
  constructor(private refreshUserTokenService: RefreshUserTokenService) {}
  async handle(request: Request, response: Response) {
    const refreshToken = request.cookies.refresh_token;

    if (!refreshToken) throw new Unauthorized('auth_token_missing_error');

    const { token, tokenExpiration } = await this.refreshUserTokenService.execute(refreshToken);

    const formatedTokenExpiration = formatExpiration(tokenExpiration);

    return response
      .status(200)
      .cookie('access_token', token, {
        httpOnly: true,
        secure: true,
        expires: formatedTokenExpiration,
        sameSite: 'strict',
        path: '/',
      })
      .send(request.t('auth_token_refreshed'));
  }
}
