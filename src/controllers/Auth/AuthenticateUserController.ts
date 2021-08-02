import { Request, Response } from 'express';
import { BadRequest } from '../../custom/errors';
import { AuthenticateUserService } from '../../services/Auth/AuthenticateUserService';

export class AuthenticateUserController {
  constructor(private authenticateUserService: AuthenticateUserService) {}

  async handle(request: Request, response: Response) {
    const { email, password } = request.body;

    if (!email || !password) throw new BadRequest('Both, email and password, are obligatory');

    const token = await this.authenticateUserService.execute({ email, password });

    return response.json({ token });
  }
}
