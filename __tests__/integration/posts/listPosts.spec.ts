import app from '../../../src/app';
import request from 'supertest';

import { postFactory, testSetup } from '../../utils';

describe('GET /posts', () => {
  testSetup();

  it('should be able to list all the posts', async () => {
    await postFactory();
    await postFactory();

    const response = await request(app).get('/posts');

    expect(response.body.length).toBe(2);
  });

  it('should be able to list only one post', async () => {
    await postFactory();
    await postFactory();

    const response = await request(app).get('/posts').query({ _start: 0, _limit: 1 });

    expect(response.body.length).toBe(1);
  });
});
