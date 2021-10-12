import { EntityRepository, Raw, Repository } from 'typeorm';
import { Categories } from '../entities/Categories';

@EntityRepository(Categories)
export class CategoriesRepositories extends Repository<Categories> {
  async findIdByName(categoryName: string) {
    try {
      const category = await this.findOne({ name: Raw((alias) => `LOWER(${alias})=LOWER('${categoryName}')`) });

      const categoryId = category?.id;

      return categoryId;
    } catch (e) {
      console.log(e);
    }
  }
}
