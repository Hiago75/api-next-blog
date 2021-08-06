import { Request, Response } from 'express';
import { Unauthorized } from '../../custom/errors';
import { RefreshUserTokenService } from '../../services/Auth/RefreshUserTokenService';

export class RefreshUserTokenController {
  constructor(private refreshUserTokenService: RefreshUserTokenService) {}
  async handle(request: Request, response: Response) {
    const refreshToken = request.headers.cookie;

    if (!refreshToken) throw new Unauthorized('Refresh token missing');

    const { token, tokenExpiration } = await this.refreshUserTokenService.execute(refreshToken);

    return response.json({ token, tokenExpiration });
  }
}
