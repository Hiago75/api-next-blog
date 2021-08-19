import request from 'supertest';
import faker from 'faker';
import app from '../../../src/app';
import { testSetup, authFactory, authorFactory, profilePhotoFactory } from '../../utils';

describe('POST /authors', () => {
  testSetup();

  const mockUserData = {
    name: faker.name.findName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    admin: false,
    profilePhotoId: '',
  };

  it('should not be able to create a new author without being authenticated', async () => {
    const response = await request(app).post('/authors').send(mockUserData);

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty('message', `You need to be logged in to access this page`);
  });

  it('should not be able to create a new author without admin permissions', async () => {
    const authorization = await authFactory('123456');
    const response = await request(app)
      .post('/authors')
      .set('Authorization', 'bearer ' + authorization)
      .send(mockUserData);

    expect(response.status).toBe(403);
    expect(response.body).toHaveProperty('message', `You don't have the necessary permissions for that`);
  });

  it('should not be able to create a new author without sending a name', async () => {
    const authorization = await authFactory('123456', true);
    const response = await request(app)
      .post('/authors')
      .set('Authorization', 'bearer ' + authorization)
      .send({ email: mockUserData.email });

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('message', "Name field can't be empty");
  });

  it('should not be able to create a new author without sending an e-mail', async () => {
    const authorization = await authFactory('123456', true);
    const response = await request(app)
      .post('/authors')
      .set('Authorization', 'bearer ' + authorization)
      .send({ name: mockUserData.name });

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('message', "E-mail field can't be empty");
  });

  it('should not be able to create a new author without sending a password', async () => {
    const authorization = await authFactory('123456', true);
    const response = await request(app)
      .post('/authors')
      .set('Authorization', 'bearer ' + authorization)
      .send({ name: mockUserData.name, email: mockUserData.email });

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('message', "Password field can't be empty");
  });

  it('should not be able to create a new author if the password is too short', async () => {
    const authorization = await authFactory('123456', true);
    const response = await request(app)
      .post('/authors')
      .set('Authorization', 'bearer ' + authorization)
      .send({ name: mockUserData.name, email: mockUserData.email, password: '123' });

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('message', 'Password need to have at least 5 characters');
  });

  it('should not be able to create a new author if the sent e-mail is already in use', async () => {
    const { email } = await authorFactory('123456');
    const authorization = await authFactory('123456', true);
    const response = await request(app)
      .post('/authors')
      .set('Authorization', 'bearer ' + authorization)
      .send({ name: mockUserData.name, email, password: mockUserData.password });

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('message', 'This e-mail is already in use');
  });

  it('should be able to create a new author without sending a profile photo', async () => {
    const authorization = await authFactory('123456', true);
    const response = await request(app)
      .post('/authors')
      .set('Authorization', 'bearer ' + authorization)
      .send(mockUserData);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('id');
  });

  it('should be able to create a new author with a profile photo', async () => {
    const authorization = await authFactory('123456', true);
    const { id } = await profilePhotoFactory();
    const response = await request(app)
      .post('/authors')
      .set('Authorization', 'bearer ' + authorization)
      .send({
        name: mockUserData.name,
        email: mockUserData.email,
        password: mockUserData.password,
        admin: mockUserData.admin,
        profilePhotoId: id,
      });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('id');
    expect(response.body).toHaveProperty('profilePhotoUrl');
  });
});
