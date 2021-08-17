import { CreateAuthorService } from '../../../src/services';
import { testSetup, authorFactory, profilePhotoFactory } from '../../utils';
import faker from 'faker';

describe('Create Author Service', () => {
  const sut = new CreateAuthorService();

  testSetup();

  it('should not be able to create a user if the email is already in use', async () => {
    const { name, email, password, admin } = await authorFactory();

    await expect(sut.execute({ name, email, password, admin, profilePhotoId: '' })).rejects.toEqual(
      new Error('user_creation_email_in_use'),
    );
  });

  it('should not be able set the user profile photo to a non-existent photo', async () => {
    const newUser = await sut.execute({
      name: faker.name.firstName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
      admin: false,
      profilePhotoId: 'fashjkfahsjf',
    });

    expect(newUser.profilePhoto).toEqual(undefined);
  });

  it('should be able to create a new author without sending a profile photo', async () => {
    const newUser = await sut.execute({
      name: faker.name.firstName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
      admin: false,
      profilePhotoId: '',
    });

    expect(newUser).toHaveProperty('id');
  });

  it('should be able to create a new author with a profile photo', async () => {
    const { id } = await profilePhotoFactory();
    const newUser = await sut.execute({
      name: faker.name.firstName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
      admin: false,
      profilePhotoId: id,
    });

    expect(newUser).toHaveProperty('id');
  });
});
