import { getCustomRepository } from 'typeorm';
import { CategoriesRepositories } from '../../../src/repositories';

export const categoryFactory = async (name: string) => {
  const categoriesRepositories = getCustomRepository(CategoriesRepositories);

  const category = categoriesRepositories.create({ name });
  await categoriesRepositories.save(category);

  return category;
};
