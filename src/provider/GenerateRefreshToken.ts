import { getCustomRepository } from 'typeorm';
import { BadRequest } from '../custom/errors';
import { Authors } from '../entities/Authors';
import { AuthorsRepositories } from '../repositories';
import { RefreshTokenRepositories } from '../repositories/RefreshTokenRepositories';

export async function GenerateRefreshToken(user: Authors) {
  const refreshTokenRepositories = getCustomRepository(RefreshTokenRepositories);
  const authorsRepositories = getCustomRepository(AuthorsRepositories);

  const expiresDate = new Date();
  expiresDate.setDate(expiresDate.getDate() + 1);

  const userAlreadyHaveToken = await refreshTokenRepositories.findOne({ user });
  if (userAlreadyHaveToken) throw new BadRequest('User already authenticated');

  const refreshToken = refreshTokenRepositories.create({ user: user, expiresOn: expiresDate });
  await refreshTokenRepositories.save(refreshToken);

  await authorsRepositories.update(user.id, { refreshToken });

  return refreshToken;
}
