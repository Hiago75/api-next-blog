import { AuthenticateUserService } from '../../../src/services';

import { authorFactory, testSetup } from '../../utils';

describe('POST /login', () => {
  const sut = new AuthenticateUserService();

  testSetup();

  it('should not be able to authenticate the user if the e-mail is invalid', async () => {
    const authenticatedUser = sut.execute({ email: 'Invalide-mail@test.com', password: '123456' });

    await expect(authenticatedUser).rejects.toEqual(new Error('auth_email_password_incorrect'));
  });

  it('should not be able to authenticate the user if the password is wrong', async () => {
    const { email } = await authorFactory('123456');

    const authenticatedUser = sut.execute({ email, password: '456789' });

    await expect(authenticatedUser).rejects.toEqual(new Error('auth_email_password_incorrect'));
  });

  it('should be able to authenticate the user', async () => {
    const { email } = await authorFactory('123456');

    const authenticatedUser = await sut.execute({ email, password: '123456' });

    expect(authenticatedUser).toHaveProperty('token');
    expect(authenticatedUser).toHaveProperty('refreshTokenId');
  });
});
