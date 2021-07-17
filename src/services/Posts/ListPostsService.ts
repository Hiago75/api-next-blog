import { getCustomRepository } from 'typeorm';
import { PostsRepositories } from '../../repositories/PostsRepositories';

export class ListPostsService {
  async execute() {
    const postsRepositories = getCustomRepository(PostsRepositories);

    const posts = postsRepositories.find({ relations: ['cover', 'author', 'category'] });

    return posts;
  }
}
