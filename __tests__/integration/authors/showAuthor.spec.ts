import app from '../../../src/app';
import request from 'supertest';

import { testSetup, authorFactory } from '../../utils';

describe('GET /authors/:id', () => {
  testSetup();

  it('should not be able to show a non-existent author', async () => {
    const response = await request(app).get(`/authors/invalid-id`);

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('message', 'User not found');
  });

  it('should be able to show the sent author', async () => {
    const { id } = await authorFactory('123456');
    const response = await request(app).get(`/authors/${id}`);

    expect(response.body).toHaveProperty('id', id);
  });
});
