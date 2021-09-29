import app from '../../../src/app';
import request from 'supertest';

import { testSetup } from '../../utils/testSetup';
import { mockToken } from '../../utils/mocks/mockAuthentication';
import { categoryFactory } from '../../utils/factories/categoryFactory';

describe('DELETE /categories', () => {
  testSetup();

  it('should not be able to delete a category without being authenticated', async () => {
    const response = await request(app).delete('/categories/invalid-id');

    expect(response.status).toEqual(401);
    expect(response.body).toHaveProperty('message', 'You need to be logged in to access this page');
  });

  it('should not be able to delete a non-existent category', async () => {
    const response = await request(app)
      .delete(`/categories/invalid-id`)
      .set('Cookie', [`access_token=${mockToken}`]);

    expect(response.status).toEqual(400);
    expect(response.body).toHaveProperty('message', 'Category not found');
  });

  it('should be able to delete the sent category', async () => {
    const { id } = await categoryFactory('Test category');

    const response = await request(app)
      .delete(`/categories/${id}`)
      .set('Cookie', [`access_token=${mockToken}`]);

    expect(response.body).toHaveProperty('deleted', true);
  });
});
