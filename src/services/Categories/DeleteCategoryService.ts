import { getCustomRepository } from 'typeorm';
import { IDeleteCategoryRequestDTO } from '../../DTOs/IDeleteCategoryRequestDTO';
import { CategoriesRepositories } from '../../repositories';

export class DeleteCategoryService {
  async execute({ categoryId }: IDeleteCategoryRequestDTO) {
    const categoriesRepositories = getCustomRepository(CategoriesRepositories);

    const categories = await categoriesRepositories.delete({ id: categoryId });

    return categories;
  }
}
