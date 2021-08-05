import { Request, Response } from 'express';
import { Unauthorized } from '../../custom/errors';
import { LogoutUserService } from '../../services/Auth/LogoutUserService';

export class LogoutUserController {
  constructor(private logoutUserService: LogoutUserService) {}

  async handle(request: Request, response: Response) {
    const refreshToken = request.headers.cookie;

    if (!refreshToken) throw new Unauthorized('Missing token');

    await this.logoutUserService.execute(refreshToken);

    return response.status(200).json('User token deleted');
  }
}
