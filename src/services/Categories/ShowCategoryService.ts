import { getCustomRepository } from 'typeorm';
import { BadRequest } from '../../custom/errors';
import { IShowCategoryRequestDTO } from '../../DTOs/IShowCategoryRequestDTO';
import { CategoriesRepositories } from '../../repositories';

export class ShowCategoryService {
  async execute({ id }: IShowCategoryRequestDTO) {
    const categoriesRepositories = getCustomRepository(CategoriesRepositories);

    const category = categoriesRepositories.findOne({ id: id });

    if (!category) throw new BadRequest('category_not_found_error');

    return category;
  }
}
