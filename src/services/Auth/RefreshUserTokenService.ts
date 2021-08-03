import { getCustomRepository } from 'typeorm';
import { BadRequest } from '../../custom/errors';
import { GenerateTokenProvider } from '../../provider/GenerateTokenProvider';
import { RefreshTokenRepositories } from '../../repositories/RefreshTokenRepositories';

export class RefreshUserTokenService {
  async execute(refresh_token: string) {
    const refreshTokenRepositories = await getCustomRepository(RefreshTokenRepositories);

    // Refactor relations

    const refreshToken = await refreshTokenRepositories.findOne({
      where: { id: refresh_token },
      relations: ['user'],
    });

    if (!refreshToken) throw new BadRequest('Invalid refresh token');

    const token = GenerateTokenProvider(refreshToken.user);

    return token;
  }
}
