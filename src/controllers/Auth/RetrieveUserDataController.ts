import jwt from 'jsonwebtoken';
import { Request, Response } from 'express';
import { RetrieveUserDataService } from '../../services/Auth/RetrieveUserDataService';
import { Unauthorized } from '../../custom/errors';

export class RetrieveUserDataController {
  constructor(private retrieveUserDataService: RetrieveUserDataService) {}

  async handle(request: Request, response: Response) {
    const token = request.headers.authorization;

    if (!token) return response.status(401).send({ error: 'No Token provided' });

    try {
      jwt.verify(token, process.env.TOKEN_SECRET as string);
    } catch (e) {
      throw new Unauthorized('Invalid token');
    }

    const user = await this.retrieveUserDataService.execute(token);

    return response.json({
      user,
    });
  }
}
