import app from '../../../src/app';
import request from 'supertest';

import { categoryFactory, postFactory, testSetup } from '../../utils';

describe('GET /posts/categories/:category', () => {
  testSetup();

  it('should not be able to show posts from a non-existent category', async () => {
    const response = await request(app).get('/posts/categories/invalid');

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('message', 'Category not found');
  });

  it('should be able to show the posts with the sent category', async () => {
    const nodeJS = await categoryFactory('NodeJS');
    await postFactory('Some title', nodeJS);
    await postFactory('Another title', nodeJS);

    const response = await request(app).get('/posts/categories/nodejs');

    expect(response.body.length).toBe(2);
  });

  it('should be able to show and paginate the posts', async () => {
    const nodeJS = await categoryFactory('NodeJS');
    await postFactory('Some title', nodeJS);
    await postFactory('Another title', nodeJS);

    const response = await request(app).get('/posts/categories/nodejs').query({ _start: 0, _limit: 1 });

    expect(response.body.length).toBe(1);
  });
});
