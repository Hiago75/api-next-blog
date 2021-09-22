import app from '../../../src/app';
import request from 'supertest';

import { authorFactory, testSetup } from '../../utils';
import { GenerateRefreshTokenProvider } from '../../../src/provider';

describe('DELETE /auth/logout', () => {
  testSetup();

  it('should not be able to loggout the user without sending a refresh token', async () => {
    const response = await request(app).delete('/auth/logout');

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty('message', 'Missing token');
  });

  it('should not be able to loggout the user if the refresh token is invalid', async () => {
    const response = await request(app).delete('/auth/logout').set('Cookie', [`refresh_token=invalidToken`]);

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('message', 'This user is not logged in the platform');
  });

  it('should be able to loggout the user', async () => {
    const user = await authorFactory('123456');
    const { id } = await GenerateRefreshTokenProvider(user);

    const response = await request(app)
      .delete('/auth/logout')
      .set('Cookie', [`refresh_token=${id}`]);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('message', 'User logged-out');
  });
});
