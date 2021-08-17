import app from '../../../src/app';
import request from 'supertest';

import { testSetup, authorFactory } from '../../utils';

describe('List authors', () => {
  testSetup();

  it('should list all the authors', async () => {
    await authorFactory();
    await authorFactory();
    const response = await request(app).get(`/authors`);

    expect(response.body.length).toEqual(2);
  });
});
