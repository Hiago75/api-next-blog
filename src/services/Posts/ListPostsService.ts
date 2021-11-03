import { getCustomRepository } from 'typeorm';
import { IListPostsRequestDTO } from '../../DTOs/IListPostsRequestDTO';
import { AuthorsRepositories, CategoriesRepositories } from '../../repositories';
import { PostsRepositories } from '../../repositories/PostsRepositories';

export class ListPostsService {
  async execute({ start, limit, category, author }: IListPostsRequestDTO) {
    try {
      const postsRepositories = getCustomRepository(PostsRepositories);
      const categoriesRepositores = getCustomRepository(CategoriesRepositories);
      const authorsRepositories = getCustomRepository(AuthorsRepositories);

      const categoryId = category ? await categoriesRepositores.findIdByName(category) : undefined;
      const authorId = author ? await authorsRepositories.findIdByName(author) : undefined;

      const posts = await postsRepositories.findAndPaginate(start, limit, categoryId, authorId);

      return posts;
    } catch (e) {
      console.log(e);
    }
  }
}
