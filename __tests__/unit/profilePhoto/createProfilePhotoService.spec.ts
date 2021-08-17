import faker from 'faker';
import { CreateProfilePhotoService } from '../../../src/services';
import { testSetup } from '../../utils';

describe('Create profile photo service', () => {
  const sut = new CreateProfilePhotoService();
  const fakeUrl = faker.internet.url();

  testSetup();

  it('should create a new profile photo', async () => {
    const profilePhoto = await sut.execute({ url: fakeUrl });

    expect(profilePhoto).toHaveProperty('id');
  });
});
