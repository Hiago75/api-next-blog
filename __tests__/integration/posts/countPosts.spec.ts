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

  it('should be able to count all posts for each category', async () => {
    const { category } = await postFactory();

    const response = await request(app).get('/posts/count');

    expect(response.body).toHaveProperty('categories', [{ name: category.name, posts: 1 }]);
  });

  it('should be able to count the user posts with the categories', async () => {
    const { author, category } = await postFactory();

    const response = await request(app).get('/posts/count');

    expect(response.body).toHaveProperty('authors', [
      { name: author.name, posts: 1, categories: [{ name: category.name, posts: 1 }] },
    ]);
  });
});
