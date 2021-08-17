import request from 'supertest';
import path from 'path';
import app from '../../../src/app';
import { testSetup, authFactory } from '../../utils';

describe('Create profile photo', () => {
  const filePath = path.resolve(__dirname, '..', '..', 'files', 'testPhoto.jpg');

  testSetup();

  it('should not be able to create a new profile photo without being authenticated', async () => {
    const response = await request(app).post('/photo').attach('image', filePath);
    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty('message', 'You need to be logged in to access this page');
  });

  it('should not be able to create a new profile photo without sending a photo', async () => {
    const authorization = await authFactory('123456');
    const response = await request(app)
      .post('/photo')
      .set('Authorization', 'bearer ' + authorization);

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('message', 'You need to send a photo');
  });

  it('should be able to create a new profile photo', async () => {
    const authorization = await authFactory('123456');
    const response = await request(app)
      .post('/photo')
      .set('Authorization', 'bearer ' + authorization)
      .attach('image', filePath);

    expect(response.status).toBe(200);
  });
});
