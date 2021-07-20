import { getCustomRepository } from 'typeorm';
import { PostsRepositories } from '../../repositories/PostsRepositories';

export class ListPostsService {
  async execute() {
    const postsRepositories = getCustomRepository(PostsRepositories);

    const posts = postsRepositories.find({
      relations: [
        'cover',
        'cover.format',
        'cover.format.large',
        'cover.format.medium',
        'cover.format.small',
        'cover.format.thumbnail',
        'author',
        'category',
      ],
    });

    return posts;
  }
}
