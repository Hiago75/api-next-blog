import faker from 'faker';
import { CreateProfilePhotoService } from '../../../src/services';
import { testFactory, authorFactory } from '../../utils';

describe('Create profile photo service', () => {
  const sut = new CreateProfilePhotoService();
  const fakeUrl = faker.internet.url();

  testFactory();

  it('should not be able to create a profile photo for a non-existent user', async () => {
    await expect(sut.execute({ url: fakeUrl, userId: 'fasfasdf' })).rejects.toEqual(new Error('user_not_found_error'));
  });

  it('should create a new profile photo', async () => {
    const { id } = await authorFactory();
    const profilePhoto = await sut.execute({ url: fakeUrl, userId: id });

    expect(profilePhoto).toHaveProperty('id');
  });
});
