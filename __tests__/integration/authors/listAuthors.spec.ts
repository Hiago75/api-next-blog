import app from '../../../src/app';
import request from 'supertest';

import { testFactory, authorFactory } from '../../utils';

describe('List authors', () => {
  testFactory();

  it('should list all the authors', async () => {
    await authorFactory();
    await authorFactory();
    const response = await request(app).get(`/authors`);

    expect(response.body.length).toEqual(2);
  });
});
