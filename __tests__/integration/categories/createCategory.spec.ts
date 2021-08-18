import app from '../../../src/app';
import request from 'supertest';

import { mockToken } from '../../utils/mocks/mockAuthentication';
import { testSetup } from '../../utils/testSetup';
import { categoryFactory } from '../../utils/factories/categoryFactory';

describe('POST /categories', () => {
  testSetup();

  it('should not be able to create a category without being authenticated', async () => {
    const response = await request(app).post('/categories').send({ name: 'Integration test' });

    expect(response.status).toEqual(401);
    expect(response.body).toHaveProperty('message', 'You need to be logged in to access this page');
  });

  it('should not be able to create a category without sending a name', async () => {
    const response = await request(app)
      .post('/categories')
      .set('Authorization', 'bearer ' + mockToken);

    expect(response.status).toEqual(400);
    expect(response.body).toHaveProperty('message', `Name field can't be empty`);
  });

  it('should not be able to create two categories with the same name', async () => {
    await categoryFactory('Already existent category');

    const response = await request(app)
      .post('/categories')
      .send({ name: 'Already existent category' })
      .set('Authorization', 'bearer ' + mockToken);

    expect(response.status).toEqual(400);
    expect(response.body).toHaveProperty('message', 'This category already exists');
  });

  it('should create a new category', async () => {
    const response = await request(app)
      .post('/categories')
      .send({ name: 'Test category' })
      .set('Authorization', 'bearer ' + mockToken);

    expect(response.body).toHaveProperty('name', 'Test category');
  });
});
