import { getCustomRepository } from 'typeorm';
import { BadRequest } from '../../shared/errors';
import { IShowCategoryRequestDTO } from '../../DTOs/IShowCategoryRequestDTO';
import { CategoriesRepositories } from '../../repositories';

export class ShowCategoryService {
  async execute({ id }: IShowCategoryRequestDTO) {
    const categoriesRepositories = getCustomRepository(CategoriesRepositories);

    const category = await categoriesRepositories.findOne(id);
    if (!category) throw new BadRequest('category_not_found_error');

    return category;
  }
}
