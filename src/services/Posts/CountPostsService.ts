import { getCustomRepository } from 'typeorm';
import { AuthorsRepositories, CategoriesRepositories } from '../../repositories';
import { PostsRepositories } from '../../repositories/PostsRepositories';

interface ICategoryCounter {
  [key: string]: number;
}

interface IUserCounter {
  [key: string]: {
    posts: number;
    categories: ICategoryCounter;
  };
}

export class CountPostsService {
  async execute() {
    const postsRepositories = getCustomRepository(PostsRepositories);

    const numOfPosts = await postsRepositories.count({ relations: ['author'] });
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
    const postsRepositories = getCustomRepository(PostsRepositories);
    const authorsRepositories = getCustomRepository(AuthorsRepositories);

    const authors = await authorsRepositories.find();

    const authorData: IUserCounter = {};

    // Get every user name and post amount, then create an object with that data and return
    for await (const author of authors) {
      const authorPosts = await postsRepositories.count({
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
    const categoriesRepositories = getCustomRepository(CategoriesRepositories);
    const postsRepositories = getCustomRepository(PostsRepositories);

    const categories = await categoriesRepositories.find();

    const categoriesData: { [key: string]: number } = {};

    for await (const category of categories) {
      const { name } = category;

      // If user has been sent, search him(er) posts on all categories
      const categoryPosts = authorId
        ? await postsRepositories.count({
            relations: ['category', 'author'],
            where: { category: { id: category.id }, author: { id: authorId } },
          })
        : await postsRepositories.count({
            relations: ['category', 'author'],
            where: { category: { id: category.id } },
          });

      categoriesData[name] = categoryPosts;
    }

    return categoriesData;
  }
}
