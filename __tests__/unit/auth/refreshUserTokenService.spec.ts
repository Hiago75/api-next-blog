import { GenerateRefreshTokenProvider } from '../../../src/provider';
import { RefreshUserTokenService } from '../../../src/services';
import { authorFactory, testSetup } from '../../utils';

describe('Refresh user token service', () => {
  const sut = new RefreshUserTokenService();

  testSetup();

  it('should not be able to refresh an invalid user token', async () => {
    const refreshToken = 'invalid token';

    await expect(sut.execute(refreshToken)).rejects.toEqual(new Error('auth_token_invalid_error'));
  });

  it('should be able to refresh the user token', async () => {
    const user = await authorFactory('123456');
    const { id: refreshToken } = await GenerateRefreshTokenProvider(user);

    const refreshedToken = await sut.execute(refreshToken);

    expect(refreshedToken).toHaveProperty('token');
  });
});
