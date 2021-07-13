import { getCustomRepository } from 'typeorm';
import { ICategoryRequestDTO } from '../../DTOs/ICategoryRequestDTO';
import { CategoriesRepositories } from '../../repositories/CategoriesRepositories';

export class CreateCategoryService {
  async execute({ name }: ICategoryRequestDTO) {
    const categoriesRepositories = getCustomRepository(CategoriesRepositories);
    // TODO - Create custom error classes

    if (!name) {
      throw new Error('Category name is empty');
    }

    const categoryAlreadyExists = await categoriesRepositories.findOne({ name });

    if (categoryAlreadyExists) {
      throw new Error('Category already exists');
    }

    const category = categoriesRepositories.create({ name });

    await categoriesRepositories.save(category);

    return category;
  }
}
