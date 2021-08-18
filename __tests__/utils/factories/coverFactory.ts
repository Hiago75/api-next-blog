import faker from 'faker';
import { getCustomRepository } from 'typeorm';
import { CoversRepositories } from '../../../src/repositories';
import { formatsFactory } from '..';

export const coversFactory = async () => {
  const coversRepositories = getCustomRepository(CoversRepositories);
  const format = await formatsFactory();
  const name = faker.name.findName();
  const url = faker.internet.url();
  const publicId = faker.internet.domainName();

  const cover = coversRepositories.create({
    format,
    height: 1920,
    width: 2080,
    name,
    provider: 'Myself',
    url,
    publicId,
  });
  await coversRepositories.save(cover);

  return cover;
};
