import { Request, Response } from 'express';
import { RefreshUserTokenService } from '../../services/Auth/RefreshUserTokenService';

export class RefreshUserTokenController {
  constructor(private refreshUserTokenService: RefreshUserTokenService) {}
  async handle(request: Request, response: Response) {
    const { refresh_token } = request.body;

    const token = await this.refreshUserTokenService.execute(refresh_token);
    console.log(token);

    return response.json(token);
  }
}
