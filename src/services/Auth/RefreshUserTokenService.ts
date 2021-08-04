import { getCustomRepository } from 'typeorm';
import { Unauthorized } from '../../custom/errors';
import { GenerateTokenProvider } from '../../provider/GenerateTokenProvider';
import { RefreshTokenRepositories } from '../../repositories/RefreshTokenRepositories';

export class RefreshUserTokenService {
  async execute(refresh_token: string) {
    const refreshTokenRepositories = getCustomRepository(RefreshTokenRepositories);

    // Refactor relations

    const refreshToken = await refreshTokenRepositories.findOne({
      where: { id: refresh_token },
      relations: ['user'],
    });

    if (!refreshToken) throw new Unauthorized('Invalid token');

    const token = GenerateTokenProvider(refreshToken.user);
    return token;
  }
}
