import app from '../../../src/app';
import request from 'supertest';

import { mockToken, categoryFactory, coversFactory, postFactory, testSetup } from '../../utils';

describe('PUT /posts', () => {
  testSetup();

  const getPostData = async (newPost: boolean, realPostData: boolean, newPostTitle?: string) => {
    const post = newPost ? await postFactory(newPostTitle) : undefined;
    const categoryId = realPostData ? (await categoryFactory('Test category')).id : undefined;
    const coverId = realPostData ? (await coversFactory()).id : undefined;

    const postData = {
      title: 'Test title',
      content: 'Test Content',
      categoryId,
      coverId,
    };

    return { post, postData };
  };

  it('should not be able to create a new post without being authenticated', async () => {
    const response = await request(app).post('/posts');

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty('message', 'You need to be logged in to access this page');
  });

  it('should not be able to update a non-existant post ', async () => {
    const response = await request(app)
      .put(`/posts/fajsdklfasjd`)
      .set('Cookie', [`access_token=${mockToken}`]);

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('message', 'Post not found');
  });

  it('should not be able to update a post if the sent title is already in use', async () => {
    const { post } = await getPostData(true, false, 'Test title');
    const response = await request(app)
      .put(`/posts/${post.id}`)
      .set('Cookie', [`access_token=${mockToken}`])
      .send({ title: 'Test title' });

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('message', 'This title is already in use');
  });

  it('should be able to update only one field of a post', async () => {
    const { post } = await getPostData(true, false);
    const response = await request(app)
      .put(`/posts/${post.id}`)
      .set('Cookie', [`access_token=${mockToken}`])
      .send({ title: 'Test title' });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('title', 'Test title');
  });

  it('should be able to update all post fields', async () => {
    const { post, postData } = await getPostData(true, true);
    const response = await request(app)
      .put(`/posts/${post.id}`)
      .set('Cookie', [`access_token=${mockToken}`])
      .send(postData);

    delete postData.categoryId;
    delete postData.coverId;

    expect(response.status).toBe(200);
    expect(response.body).toMatchObject(postData);
  });
});
