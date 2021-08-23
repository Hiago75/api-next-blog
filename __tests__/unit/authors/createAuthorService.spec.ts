import { CreateAuthorService } from '../../../src/services';
import { testSetup, authorFactory } from '../../utils';
import faker from 'faker';

describe('Create Author Service', () => {
  const sut = new CreateAuthorService();

  testSetup();

  it('should not be able to create a user if the email is already in use', async () => {
    const { name, email, password, admin } = await authorFactory('123456');

    await expect(sut.execute({ name, email, password, admin })).rejects.toEqual(
      new Error('user_creation_email_in_use'),
    );
  });

  it('should be able to create a new author', async () => {
    const newUser = await sut.execute({
      name: faker.name.firstName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
      admin: false,
    });

    expect(newUser).toHaveProperty('id');
  });
});
