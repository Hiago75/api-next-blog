import { inject, injectable } from 'tsyringe';
import { IListPosts } from '../domain/model/IListsPosts';
import { IPostsRepository } from '../domain/repositories/IPostsRepository';
import { IAuthorsRepository } from '@modules/authors/domain/repositories/IAuthorsRepository';
import { ICategoriesRepository } from '../domain/repositories/ICategoriesRepository';


@injectable()
export class ListPostsService {
  constructor(
    @inject('PostsRepository')
    private postsRepository: IPostsRepository,
    @inject('CategoriesRepository')
    private categoriesRepository: ICategoriesRepository,
    @inject('AuthorsRepository')
    private authorsRepository: IAuthorsRepository,
  ) { }

  async execute({ start, limit, category, author }: IListPosts) {
    try {
      const categoryId = category ? await this.categoriesRepository.findIdByName(category) : undefined;
      const authorId = author ? await this.authorsRepository.findIdByName(author) : undefined;

      const posts = await this.postsRepository.findAll({
        start,
        limit,
        category: categoryId,
        author: authorId
      });

      return posts;
    } catch (e) {
      console.log(e);
    }
  }
}
