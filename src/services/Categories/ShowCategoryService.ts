import { getCustomRepository } from 'typeorm';
import { IShowCategoryRequestDTO } from '../../DTOs/IShowCategoryRequestDTO';
import { CategoriesRepositories } from '../../repositories';

export class ShowCategoryService {
  async execute({ id }: IShowCategoryRequestDTO) {
    const categoriesRepositories = getCustomRepository(CategoriesRepositories);

    const category = categoriesRepositories.findOne({ id: id });

    return category;
  }
}
