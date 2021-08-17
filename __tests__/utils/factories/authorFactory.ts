import faker from 'faker';
import { CreateAuthorService } from '../../../src/services';

// TODO: Refactor the factories to work directly with the repositories

export const authorFactory = async (password?: string, admin?: boolean, profilePhotoId?: string) => {
  const userName = faker.name.firstName();
  const userEmail = faker.internet.email();
  const userPassword = password || faker.internet.password();
  const profilePhoto = profilePhotoId || '';
  const sentAdmin = admin || false;

  const createAuthorService = new CreateAuthorService();
  const category = await createAuthorService.execute({
    name: userName,
    email: userEmail,
    password: userPassword,
    admin: sentAdmin,
    profilePhotoId: profilePhoto,
  });

  return category;
};
