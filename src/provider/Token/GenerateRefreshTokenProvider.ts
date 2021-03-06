import dayjs from 'dayjs';
import { getCustomRepository } from 'typeorm';
import { Authors } from '../../entities/Authors';
import { RefreshTokenRepositories } from '../../repositories/RefreshTokenRepositories';

// Create a refresh token to user
export async function GenerateRefreshTokenProvider(user: Authors) {
  const refreshTokenRepositories = getCustomRepository(RefreshTokenRepositories);

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
