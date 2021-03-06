import app from '../../../src/app';
import request from 'supertest';

import { mockToken, postFactory, testSetup } from '../../utils';

describe('DELETE /posts', () => {
  testSetup();

  it('should not be able to delete a post without being authenticated', async () => {
    const response = await request(app).delete('/posts/invalid-id');

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty('message', 'You need to be logged in to access this page');
  });

  it('should not be able to delete a non-existent post', async () => {
    const response = await request(app)
      .delete('/posts/Invalid-id')
      .set('Cookie', [`access_token=${mockToken}`]);

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('message', 'Post not found');
  });

  it('should be able to delete the sent post', async () => {
    const { id } = await postFactory();

    const response = await request(app)
      .delete(`/posts/${id}`)
      .set('Cookie', [`access_token=${mockToken}`]);

    expect(response.body).toHaveProperty('deleted', true);
  });
});
