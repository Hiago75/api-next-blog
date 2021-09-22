import app from '../../../src/app';
import request from 'supertest';

import { authorFactory, testSetup } from '../../utils';

describe('POST /auth/login', () => {
  testSetup();

  it('should not authenticate the user if e-mail and password was not sent', async () => {
    const response = await request(app).post('/auth/login');

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('message', 'Both, e-mail and password are necessary to proceed');
  });

  it(`should not authenticate the user if the user don't exists`, async () => {
    const response = await request(app).post('/auth/login').send({ email: 'email@test.com', password: '123456' });

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty('message', 'E-mail/password incorrect');
  });

  it(`should not authenticate the user if the password is incorrect`, async () => {
    const { email } = await authorFactory('123456');
    const response = await request(app).post('/auth/login').send({ email, password: '456789' });

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty('message', 'E-mail/password incorrect');
  });

  it(`should authenticate the user`, async () => {
    const { email } = await authorFactory('123456');
    const response = await request(app).post('/auth/login').send({ email, password: '123456' });

    expect(response.headers).toHaveProperty('set-cookie');
  });
});
