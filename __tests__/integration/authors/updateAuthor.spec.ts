import app from '../../../src/app';
import request from 'supertest';

import { testSetup, authFactory } from '../../utils';

describe('PUT /authors', () => {
  testSetup();

  it('should not be able to update a user if this one is not authenticated', async () => {
    const response = await request(app).put('/authors').send({ name: 'Test Name', email: 'testEmail@gmail.com' });

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty('message', 'You need to be logged in to access this page');
  });

  it('should be able to update the user name', async () => {
    const authorization = await authFactory('123456');
    const response = await request(app)
      .put('/authors')
      .set('Cookie', [`access_token=${authorization}`])
      .send({ name: 'Test Name' });

    expect(response.body).toHaveProperty('name', 'Test Name');
  });

  it('should be able to update the user e-mail', async () => {
    const authorization = await authFactory('123456');
    const response = await request(app)
      .put('/authors')
      .set('Cookie', [`access_token=${authorization}`])
      .send({ email: 'testEmail@gmail.com' });

    expect(response.body).toHaveProperty('email', 'testEmail@gmail.com');
  });

  it('should be able to update the user name and e-mail', async () => {
    const authorization = await authFactory('123456');
    const response = await request(app)
      .put('/authors')
      .set('Cookie', [`access_token=${authorization}`])
      .send({ name: 'Test Name', email: 'testEmail@gmail.com' });

    expect(response.body).toHaveProperty('name', 'Test Name');
    expect(response.body).toHaveProperty('email', 'testEmail@gmail.com');
  });
});
