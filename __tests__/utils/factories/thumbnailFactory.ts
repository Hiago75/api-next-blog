import faker from 'faker';
import { getCustomRepository } from 'typeorm';
import { ThumbnailRepositories } from '../../../src/repositories';

export const thumbnailPhotoFactory = async () => {
  const thumbnailRepositories = getCustomRepository(ThumbnailRepositories);
  const fakeUrl = faker.internet.url();

  const thumbnailPhoto = thumbnailRepositories.create({ width: 500, height: 250, url: fakeUrl });
  await thumbnailRepositories.save(thumbnailPhoto);

  return thumbnailPhoto;
};
