import { BadRequest } from '@shared/errors';
import { IRefreshTokenRepository } from '@modules/authors/domain/repositories/IRefreshTokenRepository';
import { inject, injectable } from 'tsyringe';

@injectable()
export class LogoutUserService {
  constructor(
    @inject('RefreshTokensRepository')
    private refreshTokensRepository: IRefreshTokenRepository
  ) { }

  // Delete the refreshToken received on parameter
  async execute(refreshToken: string) {
    const sessionExists = await this.refreshTokensRepository.findByToken(refreshToken);
    if (!sessionExists) throw new BadRequest('auth_logout_session_not_found');

    await this.refreshTokensRepository.delete(refreshToken);
  }
}
