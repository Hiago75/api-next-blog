import request from 'supertest';
import path from 'path';
import app from '../../../src/app';
import { testSetup, mockToken, authFactory } from '../../utils';

describe('POST /photo', () => {
  const filePath = path.resolve(__dirname, '..', '..', 'files', 'testPhoto.jpg');

  testSetup();

  it('should not be able to create a new profile photo without being authenticated', async () => {
    const response = await request(app).post('/photo').attach('image', filePath);
    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty('message', 'You need to be logged in to access this page');
  });

  it('should not be able to create a new profile photo without sending a photo', async () => {
    const response = await request(app)
      .post('/photo')
      .set('Authorization', 'bearer ' + mockToken);

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('message', 'You need to send a photo');
  });

  it('should not be able to create a new profile photo to a non-existent user', async () => {
    const response = await request(app)
      .post('/photo')
      .set('Authorization', 'bearer ' + mockToken)
      .attach('image', filePath);

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('message', 'User not found');
  });

  it('should be able to create a new profile photo', async () => {
    const token = await authFactory('123456');
    const response = await request(app)
      .post('/photo')
      .set('Authorization', 'bearer ' + token)
      .attach('image', filePath);

    expect(response.status).toBe(200);
  });
});
