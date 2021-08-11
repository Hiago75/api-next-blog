import { getCustomRepository } from 'typeorm';
import { BadRequest } from '../../custom/errors';
import { IDeleteCategoryRequestDTO } from '../../DTOs/IDeleteCategoryRequestDTO';
import { CategoriesRepositories } from '../../repositories';

export class DeleteCategoryService {
  async execute({ categoryId }: IDeleteCategoryRequestDTO) {
    const categoriesRepositories = getCustomRepository(CategoriesRepositories);
    const categoryExists = await categoriesRepositories.findOne({ id: categoryId });

    if (!categoryExists) throw new BadRequest('category_not_found_error');

    const categories = await categoriesRepositories.delete({ id: categoryId });

    return categories;
  }
}
