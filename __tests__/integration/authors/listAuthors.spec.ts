import app from '../../../src/app';
import request from 'supertest';

import { testSetup, authorFactory } from '../../utils';

describe('GET /authors', () => {
  testSetup();

  it('should list all the authors', async () => {
    await authorFactory('123456');
    await authorFactory('123456');
    const response = await request(app).get(`/authors`);

    expect(response.body.length).toEqual(2);
  });
});
