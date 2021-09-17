import app from '../../../src/app';
import request from 'supertest';

import { postFactory, testSetup } from '../../utils';

describe('GET /posts', () => {
  testSetup();

  it('should be able to count all the posts', async () => {
    await postFactory();
    await postFactory();

    const response = await request(app).get('/posts/count');

    expect(response.body).toHaveProperty('total', 2);
  });

  it('should be able to count the user posts', async () => {
    const { author } = await postFactory();

    const response = await request(app).get('/posts/count');

    expect(response.body).toHaveProperty('authors', [{ name: author.name, posts: 1 }]);
  });
});
