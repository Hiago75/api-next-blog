import app from '../../../src/app';
import request from 'supertest';

import { testSetup } from '../../utils/testSetup';
import { categoryFactory } from '../../utils/factories/categoryFactory';

describe('List categories', () => {
  testSetup();

  it('should list all the categories', async () => {
    await categoryFactory('Test category');
    await categoryFactory('Another test category');
    const response = await request(app).get(`/categories`);

    expect(response.body.length).toEqual(2);
  });
});
