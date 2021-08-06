import jwt from 'jsonwebtoken';
import { Request, Response } from 'express';
import { RetrieveUserDataService } from '../../services/Auth/RetrieveUserDataService';
import { Unauthorized } from '../../custom/errors';
import { formatToken } from '../../utils/formatToken';

export class RetrieveUserDataController {
  constructor(private retrieveUserDataService: RetrieveUserDataService) {}

  async handle(request: Request, response: Response) {
    const rawToken = request.headers.authorization;

    if (!rawToken) return response.status(401).send({ error: 'No Token provided' });

    const token = formatToken(rawToken);

    try {
      jwt.verify(token, process.env.TOKEN_SECRET as string);
    } catch (e) {
      console.log(e);
      throw new Unauthorized('Invalid token');
    }

    const user = await this.retrieveUserDataService.execute(token);

    return response.json({
      user,
    });
  }
}
