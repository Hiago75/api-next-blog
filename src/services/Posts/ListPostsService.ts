import { getCustomRepository } from 'typeorm';
import { PostsRepositories } from '../../repositories/PostsRepositories';

export class ListPostsService {
  async execute(start: number, limit: number) {
    const postsRepositories = getCustomRepository(PostsRepositories);
    let posts;

    if (start || limit) {
      posts = postsRepositories.findAndPaginate(start, limit);
    } else {
      posts = postsRepositories.findAndOrder();
    }
    return posts;
  }
}
