import { getCustomRepository } from 'typeorm';
import { AuthorsRepositories } from '../../repositories';
import { PostsRepositories } from '../../repositories/PostsRepositories';

export class CountPostsService {
  async execute() {
    const postsRepositories = getCustomRepository(PostsRepositories);

    const numOfPosts = await postsRepositories.count({ relations: ['author'] });

    const authorsData: { name: string; posts: number }[] = await this.getAuthorData();

    return {
      total: numOfPosts,
      authors: authorsData,
    };
  }

  // Get each user name and number of posts
  private async getAuthorData() {
    const postsRepositories = getCustomRepository(PostsRepositories);
    const authorsRepositories = getCustomRepository(AuthorsRepositories);

    const authors = await authorsRepositories.find();

    const authorData: { name: string; posts: number }[] = [];

    // Get every user name and post amount, then create an object with that data and return
    for await (const author of authors) {
      const authorPosts = await postsRepositories.count({
        relations: ['author'],
        where: { author: { id: author.id } },
      });

      const authorPostsData = { name: author.name, posts: authorPosts };

      authorData.push(authorPostsData);
    }

    return authorData;
  }
}
