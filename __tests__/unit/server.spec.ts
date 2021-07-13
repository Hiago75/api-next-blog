import { server } from '../../src/server';
import request from 'supertest';

describe('Test my app server', () => {
  it('should get main route', async () => {
    const res = await request(server).get('/');

    expect(res.statusCode).toEqual(200);
  });
});

afterAll((done) => {
  server.close();
  done();
});
