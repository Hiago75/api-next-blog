import jwt from 'jsonwebtoken';
import { Request, Response } from 'express';
import { RetrieveUserDataService } from '../../services/Auth/RetrieveUserDataService';
import { Unauthorized } from '../../custom/errors';
import { formatToken } from '../../utils/formatToken';

export class RetrieveUserDataController {
  constructor(private retrieveUserDataService: RetrieveUserDataService) {}

  async handle(request: Request, response: Response) {
    const rawToken = request.headers.authorization;

    if (!rawToken) throw new Unauthorized('auth_token_missing_error');

    const token = formatToken(rawToken);

    try {
      jwt.verify(token, process.env.TOKEN_SECRET as string);
    } catch (e) {
      throw new Unauthorized('auth_token_invalid_error');
    }

    const user = await this.retrieveUserDataService.execute(token);

    return response.json({
      user,
    });
  }
}
