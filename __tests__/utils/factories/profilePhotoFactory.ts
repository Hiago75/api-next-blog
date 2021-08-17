import faker from 'faker';
import { getCustomRepository } from 'typeorm';
import { ProfilePhotosRepositories } from '../../../src/repositories';

export const profilePhotoFactory = async () => {
  const profilePhotosRepositories = getCustomRepository(ProfilePhotosRepositories);
  const url = faker.internet.url();

  const profilePhoto = profilePhotosRepositories.create({ url });
  await profilePhotosRepositories.save(profilePhoto);

  return profilePhoto;
};
