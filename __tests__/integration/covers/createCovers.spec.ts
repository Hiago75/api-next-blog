import app from '../../../src/app';
import request from 'supertest';
import path from 'path';

import { mockToken, testSetup } from '../../utils';

describe('POST /covers', () => {
  const filePath = path.resolve(__dirname, '..', '..', 'files', 'testPhoto.jpg');

  testSetup();

  jest.setTimeout(20000);

  it('should not be able to create a new cover without being logged in', async () => {
    const response = await request(app).post('/covers');

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty('message', 'You need to be logged in to access this page');
  });

  it('should not be able to create a new cover without sending a photo', async () => {
    const response = await request(app)
      .post('/covers')
      .set('Cookie', [`access_token=${mockToken}`]);

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('message', 'You need to send a photo');
  });

  it('should be able to create a new Photo', async () => {
    const response = await request(app)
      .post('/covers')
      .set('Cookie', [`access_token=${mockToken}`])
      .attach('image', filePath);

    expect(response.body).toHaveProperty('id');
  });
});
