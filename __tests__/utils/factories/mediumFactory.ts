import faker from 'faker';
import { getCustomRepository } from 'typeorm';
import { MediumRepositories } from '../../../src/repositories';

export const mediumPhotoFactory = async () => {
  const mediumRepositories = getCustomRepository(MediumRepositories);
  const fakeUrl = faker.internet.url();

  const mediumPhoto = mediumRepositories.create({ width: 1280, height: 720, url: fakeUrl });
  await mediumRepositories.save(mediumPhoto);

  return mediumPhoto;
};
