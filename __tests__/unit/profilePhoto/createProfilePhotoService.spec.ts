import faker from 'faker';
import { CreateProfilePhotoService } from '../../../src/services';
import { testFactory } from '../../utils';

describe('Create profile photo service', () => {
  const sut = new CreateProfilePhotoService();
  const fakeUrl = faker.internet.url();

  testFactory();

  it('should create a new profile photo', async () => {
    const profilePhoto = await sut.execute({ url: fakeUrl });

    expect(profilePhoto).toHaveProperty('id');
  });
});
