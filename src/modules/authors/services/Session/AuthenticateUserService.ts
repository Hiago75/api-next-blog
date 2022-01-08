import jwtDecode from 'jwt-decode';
import { inject, injectable } from 'tsyringe';
import { Unauthorized } from '@shared/errors';
import { IAuthorsRepository } from '@modules/authors/domain/repositories/IAuthorsRepository';
import { IHashProvider } from '@modules/authors/providers/HashProvider/models/IHashProvider';
import { IAuthenticateUser } from '@modules/authors/domain/model/Session/IAuthenticateUser';

import { GenerateRefreshTokenProvider, GenerateTokenProvider } from '../../../../provider/';
import { IToken } from '../../../../interfaces/IToken';

@injectable()
export class AuthenticateUserService {
  constructor(
    @inject('AuthorsRepository')
    private authorsRepository: IAuthorsRepository,
    @inject('HashProvider')
    private hashProvider: IHashProvider
  ) { }

  async execute({ email, password }: IAuthenticateUser) {
    const user = await this.authorsRepository.findByEmail(email);
    if (!user) throw new Unauthorized('auth_email_password_incorrect');

    const passwordMatch = await this.hashProvider.compareHash(password, user.password);
    if (!passwordMatch) throw new Unauthorized('auth_email_password_incorrect');

    const token = GenerateTokenProvider(user);
    if (!token) throw new Error('Token can`t be generated');

    const { id, expiresOn } = await GenerateRefreshTokenProvider(user);
    if (!id) throw new Error('Refesh Token can`t be generated');

    const { exp } = jwtDecode<IToken>(token);

    return { token, tokenExp: exp, refreshTokenId: id, refreshTokenExpiration: expiresOn };
  }
}
