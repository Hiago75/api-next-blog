import faker from 'faker';
import { CreateProfilePhotoService } from '../../../src/services';

export const profilePhotoFactory = async () => {
  const url = faker.internet.url();
  const createProfilePhoto = new CreateProfilePhotoService();

  const profilePhoto = await createProfilePhoto.execute({ url });

  return profilePhoto;
};
