import faker from 'faker';
import { getCustomRepository } from 'typeorm';
import { AuthorsRepositories, ProfilePhotosRepositories } from '../../../src/repositories';
import { encrypt } from '../../../src/utils/encrypt';

// TODO: Refactor the factories to work directly with the repositories

export const authorFactory = async (password: string, admin?: boolean, profilePhotoId?: string) => {
  const authorsRepositories = getCustomRepository(AuthorsRepositories);
  const profilePhotosRepositories = getCustomRepository(ProfilePhotosRepositories);

  const userName = faker.name.firstName();
  const userEmail = faker.internet.email();
  const userPassword = await encrypt(password);
  const sentAdmin = admin || false;

  // Search for the profile photo if this one have been sent
  const profilePhoto = await profilePhotosRepositories.findOne(profilePhotoId);
  const profilePhotoUrl = profilePhoto ? profilePhoto.url : undefined;

  const author = authorsRepositories.create({
    name: userName,
    email: userEmail,
    password: userPassword,
    admin: sentAdmin,
    profilePhoto,
    profilePhotoUrl,
  });

  await authorsRepositories.save(author);

  return author;
};
