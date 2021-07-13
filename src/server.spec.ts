import { server } from './server';
import request from 'supertest';

afterAll((done) => {
  server.close();
  done();
});

describe('Test my app server', () => {
  it('should get main route', async () => {
    const res = await request(server).get('/');

    expect(res.statusCode).toEqual(200);
  });
});
