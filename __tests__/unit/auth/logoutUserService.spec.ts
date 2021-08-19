import { AuthenticateUserService, LogoutUserService } from '../../../src/services';

import { authorFactory, testSetup } from '../../utils';

describe('Logout user service', () => {
  const sut = new LogoutUserService();
  const loginUser = new AuthenticateUserService();

  testSetup();

  it('should not be able to logout an user that has not logged in', async () => {
    const userLogout = sut.execute('Some invalid id');

    await expect(userLogout).rejects.toEqual(new Error('auth_logout_session_not_found'));
  });

  it('should be able to logout the user', async () => {
    const { email } = await authorFactory('123456');
    const { refreshTokenId } = await loginUser.execute({ email, password: '123456' });

    const userLogout = await sut.execute(refreshTokenId);

    expect(userLogout).toHaveProperty('loggout', true);
  });
});
