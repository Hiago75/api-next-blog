import jwtDecode from 'jwt-decode';

import { getCustomRepository } from 'typeorm';
import { Unauthorized } from '../../custom/errors';
import { IToken } from '../../interfaces/IToken';
import { GenerateTokenProvider } from '../../provider/GenerateTokenProvider';
import { RefreshTokenRepositories } from '../../repositories/RefreshTokenRepositories';

export class RefreshUserTokenService {
  async execute(refresh_token: string) {
    const refreshTokenRepositories = getCustomRepository(RefreshTokenRepositories);

    const refreshToken = await refreshTokenRepositories.findOne({
      where: { id: refresh_token },
      relations: ['user'],
    });

    if (!refreshToken) throw new Unauthorized('Invalid token');

    const refreshTokenExpiresDate = new Date(refreshToken.expiresOn * 1000);

    if (refreshTokenExpiresDate < new Date()) throw new Unauthorized('Session expired');

    const token = GenerateTokenProvider(refreshToken.user);
    const { exp } = jwtDecode<IToken>(token);

    return { token, tokenExpiration: exp };
  }
}
