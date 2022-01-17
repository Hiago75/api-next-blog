import { inject, injectable } from 'tsyringe';
import { IAuthorsRepository } from '@modules/authors/domain/repositories/IAuthorsRepository';
import { IPostsRepository } from '../domain/repositories/IPostsRepository';
import { getCustomRepository } from 'typeorm';
import { CategoriesRepositories } from 'src/repositories';

interface ICategoryCounter {
  [key: string]: number;
}

interface IUserCounter {
  [key: string]: {
    posts: number;
    categories: ICategoryCounter;
  };
}

@injectable()
export class CountPostsService {
  constructor(
    @inject('PostsRepository')
    private postsRepository: IPostsRepository,
    @inject('AuthorsRepository')
    private authorsRepository: IAuthorsRepository,
  ) { }

  async execute() {
    const numOfPosts = await this.postsRepository.count({ relations: ['author'] });
    const authorsData: IUserCounter = await this.getAuthorData();
    const categoriesData: ICategoryCounter = await this.getCategoriesData();

    return {
      total: numOfPosts,
      categories: categoriesData,
      authors: authorsData,
    };
  }

  // Get each user name and number of posts
  private async getAuthorData() {
    const authors = await this.authorsRepository.findAll();

    const authorData: IUserCounter = {};

    // Get every user name and post amount, then create an object with that data and return
    for await (const author of authors) {
      const authorPosts = await this.postsRepository.count({
        relations: ['author'],
        where: { author: { id: author.id } },
      });

      const authorCategoryPosts = await this.getCategoriesData(author.id);

      const authorPostsData = { posts: authorPosts, categories: authorCategoryPosts };

      authorData[author.name] = authorPostsData;
    }

    return authorData;
  }

  // Count the posts per category. Can receive an author id to search only this user posts
  private async getCategoriesData(authorId?: string) {
    const categoriesRepository = getCustomRepository(CategoriesRepositories)

    const categories = await categoriesRepository.find();

    const categoriesData: { [key: string]: number } = {};

    for await (const category of categories) {
      const { name } = category;

      // If user has been sent, search him(er) posts on all categories
      const categoryPosts = authorId
        ? await this.postsRepository.count({
          relations: ['category', 'author'],
          where: { category: { id: category.id }, author: { id: authorId } },
        })
        : await this.postsRepository.count({
          relations: ['category', 'author'],
          where: { category: { id: category.id } },
        });

      categoriesData[name] = categoryPosts;
    }

    return categoriesData;
  }
}
