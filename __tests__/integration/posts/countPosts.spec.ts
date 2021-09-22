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
    const categoryName = category.name;

    const response = await request(app).get('/posts/count');

    expect(response.body).toHaveProperty('categories', { [categoryName]: 1 });
  });

  it('should be able to count the user posts with the categories', async () => {
    const { author, category } = await postFactory();
    const authorName = author.name;
    const categoryName = category.name;

    const response = await request(app).get('/posts/count');

    expect(response.body).toHaveProperty('authors', { [authorName]: { categories: { [categoryName]: 1 }, posts: 1 } });
  });
});
