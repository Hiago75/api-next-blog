import { compare } from 'bcrypt';
import { getCustomRepository } from 'typeorm';
import { Unauthorized } from '../../custom/errors';

import { IAuthenticateUserRequestDTO } from '../../DTOs/IAuthenticateUserRequestDTO';
import { GenerateRefreshToken } from '../../provider/GenerateRefreshToken';
import { GenerateTokenProvider } from '../../provider/GenerateTokenProvider';
import { AuthorsRepositories } from '../../repositories';

export class AuthenticateUserService {
  async execute({ email, password }: IAuthenticateUserRequestDTO) {
    const authorsRepositories = getCustomRepository(AuthorsRepositories);

    const user = await authorsRepositories.findByEmail(email);
    if (!user) throw new Unauthorized('Email/password incorrect');

    const passwordMatch = await compare(password, user.password);
    if (!passwordMatch) throw new Unauthorized('Email/password incorrect');

    const token = GenerateTokenProvider(user);
    if (!token) throw new Error('Token can`t be generated');

    const refreshToken = await GenerateRefreshToken(user);
    if (!refreshToken) throw new Error('Refesh Token can`t be generated');

    return { token, refreshToken };
  }
}
