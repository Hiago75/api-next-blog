import path from 'path';
import { UpdateProfilePhotoService } from '../../../src/services';
import { authorFactory, profilePhotoFactory, testSetup } from '../../utils';

describe('Update profile photo service', () => {
  const sut = new UpdateProfilePhotoService();
  const file = path.resolve(__dirname, '..', '..', 'files', 'testPhoto.jpg');

  testSetup();

  it('should not be able to update a profile photo to a non existent user', async () => {
    const profilePhoto = sut.execute({ userId: 'invalid ID', file });

    await expect(profilePhoto).rejects.toEqual(new Error('user_not_found_error'));
  });

  it(`should not be able to update the profile photo if the user don't have a profile photo already`, async () => {
    const { id } = await authorFactory('123456');
    const profilePhoto = sut.execute({ userId: id, file });

    await expect(profilePhoto).rejects.toEqual(new Error('profile_photo_not_found_error'));
  });

  it('should be able to update the profile photo', async () => {
    const mockProfilePhoto = await profilePhotoFactory();
    const { id } = await authorFactory('123456', false, mockProfilePhoto.id);
    const profilePhoto = await sut.execute({ userId: id, file });

    expect(profilePhoto).toHaveProperty('id');
  });
});
