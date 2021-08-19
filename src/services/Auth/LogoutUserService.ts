import { getCustomRepository } from 'typeorm';
import { BadRequest } from '../../custom/errors';
import { RefreshTokenRepositories } from '../../repositories/RefreshTokenRepositories';

export class LogoutUserService {
  // Delete the refreshToken received on parameter
  async execute(refreshToken: string) {
    const refreshTokenRepositories = getCustomRepository(RefreshTokenRepositories);

    const sessionExists = await refreshTokenRepositories.findOne(refreshToken);
    if (!sessionExists) throw new BadRequest('auth_logout_session_not_found');

    await refreshTokenRepositories.delete(refreshToken);

    return { loggout: true };
  }
}
