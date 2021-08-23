import request from 'supertest';
import path from 'path';
import app from '../../../src/app';
import { testSetup, mockToken, authFactory, authorFactory, profilePhotoFactory } from '../../utils';
import { GenerateTokenProvider } from '../../../src/provider';

describe('PUT /photo', () => {
  const filePath = path.resolve(__dirname, '..', '..', 'files', 'testPhoto.jpg');

  testSetup();

  it('should not be able to update the profile photo without being authenticated', async () => {
    const response = await request(app).put('/photo').attach('image', filePath);
    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty('message', 'You need to be logged in to access this page');
  });

  it('should not be able to update the profile photo without sending a photo', async () => {
    const response = await request(app)
      .put('/photo')
      .set('Authorization', 'bearer ' + mockToken);

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('message', 'You need to send a photo');
  });

  it('should not be able to update the profile photo of a non-existent user', async () => {
    const response = await request(app)
      .put('/photo')
      .set('Authorization', 'bearer ' + mockToken)
      .attach('image', filePath);

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('message', 'User not found');
  });

  it(`should not be able to update the profile photo if the user don't have a profile photo already`, async () => {
    const token = await authFactory('123456');
    const response = await request(app)
      .put('/photo')
      .set('Authorization', 'bearer ' + token)
      .attach('image', filePath);

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('message', 'Profile photo not found');
  });

  it(`should be able to update the profile photo`, async () => {
    const profilePhoto = await profilePhotoFactory();
    const author = await authorFactory('123456', false, profilePhoto.id);
    const token = GenerateTokenProvider(author);

    const response = await request(app)
      .put('/photo')
      .set('Authorization', 'bearer ' + token)
      .attach('image', filePath);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('id');
  });
});
