import dayjs from 'dayjs';
import { getCustomRepository } from 'typeorm';
import { Authors } from '../../entities/Authors';
// import { AuthorsRepositories } from '../repositories';
import { RefreshTokenRepositories } from '../../repositories/RefreshTokenRepositories';

export async function GenerateRefreshTokenProvider(user: Authors) {
  const refreshTokenRepositories = getCustomRepository(RefreshTokenRepositories);

  // TODO: Refactor date
  const expiresDate = dayjs().add(1, 'day').unix();

  const userAlreadyHaveToken = await refreshTokenRepositories.findOne({ user });

  // If user already have a refresh token update the existing one, otherwise create a new one
  if (userAlreadyHaveToken) {
    const refreshToken = refreshTokenRepositories.create({
      user,
      expiresOn: expiresDate,
    });

    await refreshTokenRepositories.update({ user }, refreshToken);

    return refreshToken;
  } else {
    const refreshToken = refreshTokenRepositories.create({
      user,
      expiresOn: expiresDate,
    });

    await refreshTokenRepositories.save(refreshToken);

    return refreshToken;
  }
}
