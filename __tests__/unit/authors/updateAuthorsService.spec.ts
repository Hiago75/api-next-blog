import { UpdateAuthorService } from '../../../src/services';
import { authorFactory, testSetup } from '../../utils';

describe('Update authors service', () => {
  const sut = new UpdateAuthorService();

  testSetup();

  it('should be able to update the name of a user', async () => {
    const { id } = await authorFactory();
    const itemsToBeUpdated = { name: 'Test name' };

    const updatedUser = await sut.execute(id, itemsToBeUpdated);

    expect(updatedUser).toHaveProperty('name', 'Test name');
  });

  it('should be able to update the e-mail of a user', async () => {
    const { id } = await authorFactory();
    const itemsToBeUpdated = { email: 'testEmail@test.com' };

    const updatedUser = await sut.execute(id, itemsToBeUpdated);

    expect(updatedUser).toHaveProperty('email', 'testEmail@test.com');
  });

  // TODO: It should be able to update the user profile photo

  it('should be able to update the name and the email of a user', async () => {
    const { id } = await authorFactory();
    const itemsToBeUpdated = { name: 'Test Name', email: 'testEmail@test.com' };

    const updatedUser = await sut.execute(id, itemsToBeUpdated);

    expect(updatedUser).toHaveProperty('name', 'Test Name');
    expect(updatedUser).toHaveProperty('email', 'testEmail@test.com');
  });
});
