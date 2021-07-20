import { getCustomRepository } from 'typeorm';
import { CategoriesRepositories } from '../../repositories/CategoriesRepositories';

export class ListCategoriesService {
  async execute() {
    const categoriesRepositories = getCustomRepository(CategoriesRepositories);

    try {
      await categoriesRepositories.find({
        order: {
          name: 'ASC',
        },
      });
    } catch (e) {
      console.log(e);
    }

    // return categories;
  }
}
