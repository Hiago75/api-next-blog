import { EntityRepository, Like, Repository } from 'typeorm';
import { Categories } from '../entities/Categories';

@EntityRepository(Categories)
export class CategoriesRepositories extends Repository<Categories> {
  async findIdByName(categoryName: string) {
    const category = await this.findOne({ name: Like(`%${categoryName}%`) });
    const categoryId = category?.id;

    return categoryId;
  }
}
