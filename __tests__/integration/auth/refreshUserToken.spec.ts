import app from '../../../src/app';
import request from 'supertest';

import { authorFactory, testSetup } from '../../utils';
import { GenerateRefreshTokenProvider } from '../../../src/provider';

describe('GET /auth/refresh', () => {
  testSetup();

  it('should not be able to refresh the token without sending a refresh token', async () => {
    const response = await request(app).get('/auth/refresh');

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty('message', 'Missing token');
  });

  it('should not be able to refresh the token if the sent refresh token is invalid', async () => {
    const response = await request(app).get('/auth/refresh').set('cookie', 'invalid token');

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty('message', 'Invalid token');
  });

  it('should be able to refresh the token', async () => {
    const user = await authorFactory('123456');
    const { id } = await GenerateRefreshTokenProvider(user);
    const response = await request(app).get('/auth/refresh').set('cookie', id);

    expect(response.body).toHaveProperty('token');
  });
});
