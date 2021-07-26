import { compare } from 'bcrypt';
import { getCustomRepository } from 'typeorm';
import { sign } from 'jsonwebtoken';

import { BadRequest } from '../../custom/errors';
import { IAuthenticateUserRequestDTO } from '../../DTOs/IAuthenticateUserRequestDTO';
import { AuthorsRepositories } from '../../repositories';

export class AuthenticateUserService {
  async execute({ email, password }: IAuthenticateUserRequestDTO) {
    const authorsRepositories = getCustomRepository(AuthorsRepositories);

    const user = await authorsRepositories.findByEmail(email);
    if (!user) throw new BadRequest('Email/password incorrect');

    const passwordMatch = await compare(password, user.password);
    if (!passwordMatch) throw new BadRequest('Email/password incorrect');

    const token = sign(
      {
        email: user.email,
      },
      process.env.TOKEN_SECRET,
      {
        subject: user.id,
        expiresIn: '1d',
      },
    );

    return token;
  }
}
