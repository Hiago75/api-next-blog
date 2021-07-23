import { getCustomRepository } from 'typeorm';
import { BadRequest } from '../../custom/errors';
import { IListPostsFromCategoryRequestDTO } from '../../DTOs/IListPostsFromCategoryRequestDTO';
import { CategoriesRepositories, PostsRepositories } from '../../repositories';

export class ListPostsFromCategoryService {
  async execute({ category, start, limit }: IListPostsFromCategoryRequestDTO) {
    const postsRepositories = getCustomRepository(PostsRepositories);
    const categoriesRepositories = getCustomRepository(CategoriesRepositories);

    const categoryId = await categoriesRepositories.findIdByName(category);
    if (!categoryId) throw new BadRequest('Category not found');

    const posts = await postsRepositories.findByCategory(start, limit, categoryId);

    return posts;
  }
}
