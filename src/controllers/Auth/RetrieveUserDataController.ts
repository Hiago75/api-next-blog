import jwt from 'jsonwebtoken';
import { Request, Response } from 'express';
import { RetrieveUserDataService } from '../../services/Auth/RetrieveUserDataService';
import { Unauthorized } from '../../shared/errors';

export class RetrieveUserDataController {
  constructor(private retrieveUserDataService: RetrieveUserDataService) { }

  async handle(request: Request, response: Response) {
    const token = request.cookies.access_token;

    if (!token) throw new Unauthorized('auth_token_missing_error');

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
