import { sign } from 'jsonwebtoken';
import { InvalidTokenError } from 'jwt-decode';

import { RetrieveUserDataService } from '../../../src/services';
import { authFactory, testSetup } from '../../utils';

describe('Retrieve user data service', () => {
  const sut = new RetrieveUserDataService();

  testSetup();

  it('should not be able to retrieve data from an invalid token', async () => {
    const userData = sut.execute('Invalid token');

    await expect(userData).rejects.toEqual(
      new InvalidTokenError(`Invalid token specified: Cannot read property 'replace' of undefined`),
    );
  });

  it('should not be able to retrieve data from an non-existent user', async () => {
    const invalidToken = sign({}, process.env.TOKEN_SECRET as string, {
      subject: 'Some id',
      expiresIn: '15m',
    });

    await expect(sut.execute(invalidToken)).rejects.toEqual(new Error('user_not_found_error'));
  });

  it('should be able to retrieve the user data', async () => {
    const token = await authFactory('123456');

    const userData = await sut.execute(token);

    expect(userData).toHaveProperty('id');
  });
});
