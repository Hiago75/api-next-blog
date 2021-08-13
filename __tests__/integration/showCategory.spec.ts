import app from '../../src/app';
import request from 'supertest';

import { testFactory } from '../utils/testFactory';
import { categoryFactory } from '../utils/factories/categoryFactory';

describe('Show category', () => {
  testFactory();

  it('should not be able to show a non-existent category', async () => {
    const response = await request(app).get('/categories/fdasfasdfs');

    expect(response.status).toEqual(400);
  });

  it('should create show the sent category', async () => {
    const { id } = await categoryFactory('Test category');
    const response = await request(app).get(`/categories/${id}`);

    expect(response.body).toHaveProperty('name', 'Test category');
  });
});
