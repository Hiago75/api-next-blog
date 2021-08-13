import app from '../../src/app';
import request from 'supertest';

import { mockToken } from '../utils/mockAuthentication';
import { testFactory } from '../utils/testFactory';

describe('Create category', () => {
  testFactory();

  it('should not be able to create a category without being authenticated', async () => {
    const response = await request(app).post('/categories').send({ name: 'Integration test' });

    expect(response.status).toEqual(401);
  });

  it('should not be able to create a category without sending a name', async () => {
    const response = await request(app)
      .post('/categories')
      .set('Authorization', 'bearer ' + mockToken);

    expect(response.status).toEqual(400);
  });

  it('should create a new category', async () => {
    const response = await request(app)
      .post('/categories')
      .send({ name: 'Test category' })
      .set('Authorization', 'bearer ' + mockToken);

    expect(response.body).toHaveProperty('name', 'Test category');
  });
});
