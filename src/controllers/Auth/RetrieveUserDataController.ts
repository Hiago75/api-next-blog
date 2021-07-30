import jwt from 'jsonwebtoken';
import { Request, Response } from 'express';
import { RetrieveUserDataService } from '../../services/Auth/RetrieveUserDataService';

export class RetrieveUserDataController {
  constructor(private retrieveUserDataService: RetrieveUserDataService) {}

  async handle(request: Request, response: Response) {
    const { token } = request.body;

    if (!token) return response.status(401).send({ error: 'No Token provided' });

    try {
      jwt.verify(token, process.env.TOKEN_SECRET as string);
    } catch (e) {
      return response.status(401).send({ error: 'Invalid token' });
    }
    const user = await this.retrieveUserDataService.execute(token);

    return response.json({
      token,
      user,
    });
  }
}
