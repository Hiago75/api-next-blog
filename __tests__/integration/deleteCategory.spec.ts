import app from '../../src/app';
import request from 'supertest';

import { testFactory } from '../utils/testFactory';
import { mockToken } from '../utils/mocks/mockAuthentication';
import { categoryFactory } from '../utils/factories/categoryFactory';

describe('Delete category', () => {
  testFactory();

  it('should not be able to create a category without being authenticated', async () => {
    const response = await request(app).delete('/categories');

    expect(response.status).toEqual(401);
  });

  it('should not be able to delete a category without the category ID being sent', async () => {
    const response = await request(app)
      .delete('/categories')
      .set('Authorization', 'bearer ' + mockToken);

    expect(response.status).toEqual(400);
  });

  it('should not be able to delete a non-existent category', async () => {
    const response = await request(app)
      .delete('/categories')
      .set('Authorization', 'bearer ' + mockToken)
      .send({ categoryId: 'invalid id' });

    expect(response.status).toEqual(400);
  });

  it('should be able to delete the sent category', async () => {
    const { id } = await categoryFactory('Test category');

    const response = await request(app)
      .delete('/categories')
      .set('Authorization', 'bearer ' + mockToken)
      .send({ categoryId: id });

    expect(response.body).toHaveProperty('deleted', true);
  });
});
