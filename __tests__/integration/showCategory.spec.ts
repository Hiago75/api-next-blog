import app from '../../src/app';
import request from 'supertest';

import { testFactory } from '../utils/testFactory';
import { createCategoryMock } from '../utils/createCategory';

describe('Show category', () => {
  testFactory();

  it('should not be able to show a category with and invalid ID', async () => {
    const response = await request(app).get('/categories/fdasfasdfs');

    expect(response.status).toEqual(400);
  });

  it('should create show the sent category', async () => {
    const { id } = await createCategoryMock('Test category');
    const response = await request(app).get(`/categories/${id}`);

    expect(response.body).toHaveProperty('name', 'Test category');
  });
});
