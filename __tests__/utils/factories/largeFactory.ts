import faker from 'faker';
import { getCustomRepository } from 'typeorm';
import { LargeRepositories } from '../../../src/repositories';

export const largePhotoFactory = async () => {
  const largeRepositories = getCustomRepository(LargeRepositories);
  const fakeUrl = faker.internet.url();

  const largePhoto = largeRepositories.create({ width: 1920, height: 1080, url: fakeUrl });
  await largeRepositories.save(largePhoto);

  return largePhoto;
};
