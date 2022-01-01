import jwtDecode from 'jwt-decode';

import { getCustomRepository } from 'typeorm';
import { Unauthorized } from '../../shared/errors';
import { IToken } from '../../interfaces/IToken';
import { GenerateTokenProvider } from '../../provider/Token/GenerateTokenProvider';
import { RefreshTokenRepositories } from '../../repositories/RefreshTokenRepositories';

export class RefreshUserTokenService {
  async execute(refresh_token: string) {
    const refreshTokenRepositories = getCustomRepository(RefreshTokenRepositories);

    const refreshToken = await refreshTokenRepositories.findOne({
      where: { id: refresh_token },
      relations: ['user'],
    });

    if (!refreshToken) throw new Unauthorized('auth_token_invalid_error');

    const refreshTokenExpiresDate = new Date(refreshToken.expiresOn * 1000);

    if (refreshTokenExpiresDate < new Date()) throw new Unauthorized('auth_session_expired');

    const token = GenerateTokenProvider(refreshToken.user);
    const { exp } = jwtDecode<IToken>(token);

    return { token, tokenExpiration: exp };
  }
}
