import { compare } from 'bcrypt';
import { Request, Response } from 'express';
import { sign } from 'jsonwebtoken';
import { BadRequest, Unauthorized } from '../../custom/errors';
import { AuthenticateUserService } from '../../services/Auth/AuthenticateUserService';

export class AuthenticateUserController {
  constructor(private authenticateUserService: AuthenticateUserService) {}

  async handle(request: Request, response: Response) {
    const { email, password } = request.body;

    if (!email || !password) throw new BadRequest('Both, email and password, are obligatory');

    const user = await this.authenticateUserService.execute({ email, password });
    if (!user) throw new Unauthorized('Email/password incorrect');

    const passwordMatch = await compare(password, user.password);
    if (!passwordMatch) throw new Unauthorized('Email/password incorrect');

    const token = sign(
      {
        name: user.name,
        email: user.email,
      },
      process.env.TOKEN_SECRET as string,
      {
        subject: user.id,
        expiresIn: '1d',
      },
    );

    return response.json({ token: token });
  }
}
