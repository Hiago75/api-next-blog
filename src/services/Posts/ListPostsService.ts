import { getCustomRepository } from 'typeorm';
import { PostsRepositories } from '../../repositories/PostsRepositories';

export class ListPostsService {
  async execute(start: number, limit: number) {
    const postsRepositories = getCustomRepository(PostsRepositories);

    const posts = postsRepositories.findAndPaginate(start, limit);

    return posts;
  }
}
