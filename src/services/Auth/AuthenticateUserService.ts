import { compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { getCustomRepository } from 'typeorm';
import { Unauthorized } from '../../custom/errors';

import { IAuthenticateUserRequestDTO } from '../../DTOs/IAuthenticateUserRequestDTO';
import { AuthorsRepositories } from '../../repositories';

export class AuthenticateUserService {
  async execute({ email, password }: IAuthenticateUserRequestDTO) {
    const authorsRepositories = getCustomRepository(AuthorsRepositories);

    const user = await authorsRepositories.findByEmail(email);
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

    return token;
  }
}
