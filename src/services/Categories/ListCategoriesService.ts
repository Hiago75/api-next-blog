import { getCustomRepository } from 'typeorm';
import { CategoriesRepositories } from '../../repositories/CategoriesRepositories';

export class ListCategoriesService {
  async execute() {
    const categoriesRepositories = getCustomRepository(CategoriesRepositories);

    const categories = await categoriesRepositories.find({
      order: {
        name: 'ASC',
      },
    });

    return categories;
  }
}
