import path from 'path';
import { CreateProfilePhotoService } from '../../../src/services';
import { authorFactory, testSetup } from '../../utils';

describe('Create profile photo service', () => {
  const sut = new CreateProfilePhotoService();
  const file = path.resolve(__dirname, '..', '..', 'files', 'testPhoto.jpg');

  testSetup();

  it('should not be able to create a profile photo to a non existent user', async () => {
    const profilePhoto = sut.execute({ userId: 'invalid ID', file });

    await expect(profilePhoto).rejects.toEqual(new Error('user_not_found_error'));
  });

  it('should create a new profile photo', async () => {
    const { id } = await authorFactory('123456');
    const profilePhoto = await sut.execute({ userId: id, file });

    expect(profilePhoto).toHaveProperty('id');
  });
});
