import app from '../../../src/app';
import request from 'supertest';

import { mockToken, authorFactory, categoryFactory, coversFactory, postFactory, testSetup } from '../../utils';

describe('POST /posts', () => {
  testSetup();

  const getPostData = async () => {
    const categoryId = (await categoryFactory('Test category')).id;
    const authorId = (await authorFactory('123456')).id;
    const coverId = (await coversFactory()).id;

    const postData = {
      title: 'Test title',
      content: 'Test Content',
      categoryId,
      authorId,
      coverId,
    };

    return postData;
  };

  it('should not be able to create a new post without being authenticated', async () => {
    const response = await request(app).post('/posts').send();

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty('message', 'You need to be logged in to access this page');
  });

  it('should not be able to create a new post without sending a title', async () => {
    const response = await request(app)
      .post('/posts')
      .set('Cookie', [`access_token=${mockToken}`])
      .send({ content: 'Some content', categoryId: 'Category', coverId: 'CoverId' });

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('message', `Title field can't be empty`);
  });

  it('should not be able to create a new post without sending the content', async () => {
    const response = await request(app)
      .post('/posts')
      .set('Cookie', [`access_token=${mockToken}`])
      .send({ title: 'Test', categoryId: 'Category', coverId: 'CoverId' });

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('message', `Content field can't be empty`);
  });

  it('should not be able to create a new post without sending a category', async () => {
    const response = await request(app)
      .post('/posts')
      .set('Cookie', [`access_token=${mockToken}`])
      .send({ title: 'Test', content: 'Some content', coverId: 'CoverId' });

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('message', `Missing post category`);
  });

  it('should not be able to create a new post without sending a cover', async () => {
    const response = await request(app)
      .post('/posts')
      .set('Cookie', [`access_token=${mockToken}`])
      .send({ title: 'Test', content: 'Some content', categoryId: 'Category' });

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('message', `Missing post cover`);
  });

  it('should not be able to create a new post with an invalid category', async () => {
    const response = await request(app)
      .post('/posts')
      .set('Cookie', [`access_token=${mockToken}`])
      .send({ title: 'Test', content: 'test', categoryId: 'invalid ID', coverId: 'Invalid id' });

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('message', 'Category not found');
  });

  it('should not be able to create a new post with an invalid category', async () => {
    const categoryId = (await categoryFactory('Test')).id;

    const response = await request(app)
      .post('/posts')
      .set('Cookie', [`access_token=${mockToken}`])
      .send({ title: 'Test', content: 'test', categoryId, coverId: 'Invalid id' });

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('message', 'Cover not found');
  });

  it('should be able to create a new post', async () => {
    const postData = await getPostData();

    const response = await request(app)
      .post('/posts')
      .set('Cookie', [`access_token=${mockToken}`])
      .send(postData);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('id');
  });

  it('should not be able to create two posts with the same title', async () => {
    const postData = await getPostData();

    await postFactory(postData.title);

    const response = await request(app)
      .post('/posts')
      .set('Cookie', [`access_token=${mockToken}`])
      .send(postData);

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('message', 'This title is already in use');
  });
});
