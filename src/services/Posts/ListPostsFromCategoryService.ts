import { getCustomRepository } from 'typeorm';
import { CategoriesRepositories, PostsRepositories } from '../../repositories';

export class ListPostsFromCategoryService {
  async execute({ category }: { category: string }) {
    const postsRepositories = getCustomRepository(PostsRepositories);
    const categoriesRepositories = getCustomRepository(CategoriesRepositories);

    const categoryId = await categoriesRepositories.findIdByName(category);
    const posts = await postsRepositories.findByCategory(categoryId);

    return posts;
  }
}
