import { getCustomRepository } from 'typeorm';
import { RefreshTokenRepositories } from '../../repositories/RefreshTokenRepositories';

export class LogoutUserService {
  // Delete the refreshToken received on parameter
  async execute(refreshToken: string) {
    const refreshTokenRepositories = getCustomRepository(RefreshTokenRepositories);

    const deletedRefreshToken = await refreshTokenRepositories.delete(refreshToken);

    return deletedRefreshToken;
  }
}
