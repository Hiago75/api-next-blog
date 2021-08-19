import { Request, Response } from 'express';
import { Unauthorized } from '../../custom/errors';
import { LogoutUserService } from '../../services/Auth/LogoutUserService';

export class LogoutUserController {
  constructor(private logoutUserService: LogoutUserService) {}

  async handle(request: Request, response: Response) {
    const refreshToken = request.headers.cookie;

    if (!refreshToken) throw new Unauthorized('auth_token_missing_error');

    await this.logoutUserService.execute(refreshToken);

    return response.json({ message: request.t('auth_logout_success') });
  }
}
