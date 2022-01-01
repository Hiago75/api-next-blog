import { getCustomRepository } from 'typeorm';
import { BadRequest } from '../../shared/errors';
import { ICategoryRequestDTO } from '../../DTOs/ICategoryRequestDTO';
import { CategoriesRepositories } from '../../repositories/CategoriesRepositories';

export class CreateCategoryService {
  async execute({ name }: ICategoryRequestDTO) {
    const categoriesRepositories = getCustomRepository(CategoriesRepositories);

    if (!name) throw new BadRequest('category_creation_not_sent_name');

    const categoryAlreadyExists = await categoriesRepositories.findOne({ name });

    if (categoryAlreadyExists) throw new BadRequest('category_creation_already_exists');

    const category = categoriesRepositories.create({ name });

    await categoriesRepositories.save(category);

    return category;
  }
}
