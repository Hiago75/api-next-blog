import app from '../../../src/app';
import request from 'supertest';

import { testSetup, mockToken, authFactory } from '../../utils';

describe('GET /auth/retrieve', () => {
  testSetup();

  it('should not be able to retrieve the user data without sending a token', async () => {
    const response = await request(app).get('/auth/retrieve');

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty('message', 'Missing token');
  });

  it('should not be able to retrieve the user data sending a invalid token', async () => {
    const response = await request(app).get('/auth/retrieve').set('Authorization', 'invalid token');

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty('message', 'Invalid token format');
  });

  it('should not be able to retrieve the data of a non-existent user', async () => {
    const response = await request(app)
      .get('/auth/retrieve')
      .set('Authorization', 'bearer ' + mockToken);

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('message', 'User not found');
  });

  it('should be able to retrieve the user data', async () => {
    const accessToken = await authFactory('123456');
    const response = await request(app)
      .get('/auth/retrieve')
      .set('Authorization', 'bearer ' + accessToken);

    expect(response.body).toHaveProperty('user.id');
  });
});
