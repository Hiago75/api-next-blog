import jwtDecode from 'jwt-decode';

import { compare } from 'bcrypt';
import { getCustomRepository } from 'typeorm';

import { Unauthorized } from '../../custom/errors';
import { IAuthenticateUserRequestDTO } from '../../DTOs/IAuthenticateUserRequestDTO';
import { GenerateRefreshTokenProvider, GenerateTokenProvider } from '../../provider/';
import { AuthorsRepositories } from '../../repositories';
import { IToken } from '../../interfaces/IToken';

export class AuthenticateUserService {
  async execute({ email, password }: IAuthenticateUserRequestDTO) {
    const authorsRepositories = getCustomRepository(AuthorsRepositories);

    const user = await authorsRepositories.findByEmail(email);
    if (!user) throw new Unauthorized('auth_email_password_incorrect');

    const passwordMatch = await compare(password, user.password);
    if (!passwordMatch) throw new Unauthorized('auth_email_password_incorrect');

    const token = GenerateTokenProvider(user);
    if (!token) throw new Error('Token can`t be generated');

    const { id, expiresOn } = await GenerateRefreshTokenProvider(user);
    if (!id) throw new Error('Refesh Token can`t be generated');

    const { exp } = jwtDecode<IToken>(token);

    return { token, tokenExp: exp, refreshTokenId: id, refreshTokenExpiration: expiresOn };
  }
}
