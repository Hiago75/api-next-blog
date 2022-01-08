import { Unauthorized } from '@shared/errors';
import { inject, injectable } from 'tsyringe';
import { IRefreshTokenRepository } from '@modules/authors/domain/repositories/IRefreshTokenRepository';

// TODO: Solve
import { IToken } from '../../../../interfaces/IToken';
import { GenerateTokenProvider } from '../../../../provider/Token/GenerateTokenProvider';
import jwtDecode from 'jwt-decode';

@injectable()
export class RefreshUserTokenService {
  constructor(
    @inject('RefreshTokensRepository')
    private refreshTokensRepository: IRefreshTokenRepository,
  ) { }

  async execute(refresh_token: string) {

    const refreshToken = await this.refreshTokensRepository.findByToken(refresh_token)

    if (!refreshToken) throw new Unauthorized('auth_token_invalid_error');

    const refreshTokenExpiresDate = new Date(refreshToken.expiresOn * 1000);

    if (refreshTokenExpiresDate < new Date()) throw new Unauthorized('auth_session_expired');

    const token = GenerateTokenProvider(refreshToken.user);
    const { exp } = jwtDecode<IToken>(token);

    return { token, tokenExpiration: exp };

  }
}
