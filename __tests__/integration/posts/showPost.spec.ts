import app from '../../../src/app';
import request from 'supertest';

import { testSetup, postFactory } from '../../utils';

describe('GET /posts/:slug', () => {
  testSetup();

  it('should not be able to show a non-existent post', async () => {
    const response = await request(app).get('/posts/post/unreal-slug');

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('message', 'Post not found');
  });

  it('should be able to show the post with the sent slug', async () => {
    const { slug } = await postFactory();

    const response = await request(app).get(`/posts/post/${slug}`);

    expect(response.body).toHaveProperty('slug', slug);
  });
});
