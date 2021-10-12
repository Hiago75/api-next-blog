import { getCustomRepository } from 'typeorm';
import { IListPostsRequestDTO } from '../../DTOs/IListPostsRequestDTO';
import { CategoriesRepositories } from '../../repositories';
import { PostsRepositories } from '../../repositories/PostsRepositories';

export class ListPostsService {
  async execute({ start, limit, category }: IListPostsRequestDTO) {
    const postsRepositories = getCustomRepository(PostsRepositories);
    const categoriesRepositores = getCustomRepository(CategoriesRepositories);

    const categoryId = category ? await categoriesRepositores.findIdByName(category) : undefined;

    const posts = categoryId
      ? await postsRepositories.findByCategory(categoryId, start, limit)
      : await postsRepositories.findAndPaginate(start, limit);

    return posts;
  }
}
