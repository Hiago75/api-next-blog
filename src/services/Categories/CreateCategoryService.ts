import { getCustomRepository } from 'typeorm';
import { BadRequest } from '../../custom/errors';
import { ICategoryRequestDTO } from '../../DTOs/ICategoryRequestDTO';
import { CategoriesRepositories } from '../../repositories/CategoriesRepositories';

export class CreateCategoryService {
  async execute({ name }: ICategoryRequestDTO) {
    const categoriesRepositories = getCustomRepository(CategoriesRepositories);

    if (!name) {
      throw new BadRequest('Category name is empty');
    }

    const categoryAlreadyExists = await categoriesRepositories.findOne({ name });

    if (categoryAlreadyExists) {
      throw new BadRequest('Category already exists');
    }

    const category = categoriesRepositories.create({ name });

    await categoriesRepositories.save(category);

    return category;
  }
}
