import app from '../../../src/app';
import request from 'supertest';

import { testSetup } from '../../utils/testSetup';
import { categoryFactory } from '../../utils/factories/categoryFactory';

describe('GET /categories/:id', () => {
  testSetup();

  it('should not be able to show a non-existent category', async () => {
    const response = await request(app).get('/categories/fdasfasdfs');

    expect(response.status).toEqual(400);
    expect(response.body).toHaveProperty('message', 'Category not found');
  });

  it('should show the sent category', async () => {
    const { id } = await categoryFactory('Test category');
    const response = await request(app).get(`/categories/${id}`);

    expect(response.body).toHaveProperty('name', 'Test category');
  });
});
