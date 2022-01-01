import faker from 'faker';
import { getCustomRepository } from 'typeorm';
import { AuthorsRepositories, ProfilePhotosRepositories } from '../../../src/repositories';
import { encrypt } from '../../../src/shared/utils/encrypt';

export const authorFactory = async (password: string, admin?: boolean, profilePhotoId?: string) => {
  const authorsRepositories = getCustomRepository(AuthorsRepositories);
  const profilePhotosRepositories = getCustomRepository(ProfilePhotosRepositories);

  const userName = faker.name.findName();
  const userEmail = faker.internet.email();
  const userPassword = await encrypt(password);
  const sentAdmin = admin || false;

  // Search for the profile photo if this one have been sent
  const profilePhoto = await profilePhotosRepositories.findOne(profilePhotoId);

  const author = authorsRepositories.create({
    name: userName,
    email: userEmail,
    password: userPassword,
    admin: sentAdmin,
    profilePhoto,
  });

  await authorsRepositories.save(author);

  return author;
};
