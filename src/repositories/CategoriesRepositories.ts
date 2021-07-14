import { EntityRepository, Repository } from 'typeorm';
import { Categories } from '../entities/Categories';

@EntityRepository(Categories)
export class CategoriesRepositories extends Repository<Categories> {}
