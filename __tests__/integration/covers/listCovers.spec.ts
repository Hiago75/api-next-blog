import request from 'supertest';
import app from '../../../src/app';

import { testSetup, coversFactory } from '../../utils';

describe('GET /covers', () => {
  testSetup();

  it('should be able to list all the existent categories', async () => {
    await coversFactory();
    await coversFactory();

    const response = await request(app).get('/covers');

    expect(response.body.length).toBe(2);
  });
});
