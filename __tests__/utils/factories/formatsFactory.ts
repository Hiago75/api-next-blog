import { getCustomRepository } from 'typeorm';
import { FormatsRepositories } from '../../../src/repositories';
import { largePhotoFactory, mediumPhotoFactory, smallPhotoFactory, thumbnailPhotoFactory } from '..';

export const formatsFactory = async () => {
  const formatsRepositories = getCustomRepository(FormatsRepositories);
  const large = await largePhotoFactory();
  const medium = await mediumPhotoFactory();
  const small = await smallPhotoFactory();
  const thumbnail = await thumbnailPhotoFactory();

  const formats = formatsRepositories.create({ large, medium, small, thumbnail });
  await formatsRepositories.save(formats);

  return formats;
};
