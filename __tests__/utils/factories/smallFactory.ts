import faker from 'faker';
import { getCustomRepository } from 'typeorm';
import { SmallRepositories } from '../../../src/repositories';

export const smallPhotoFactory = async () => {
  const smallRepositories = getCustomRepository(SmallRepositories);
  const fakeUrl = faker.internet.url();

  const smallPhoto = smallRepositories.create({ width: 1000, height: 500, url: fakeUrl });
  await smallRepositories.save(smallPhoto);

  return smallPhoto;
};
