import { getCustomRepository } from 'typeorm';
import { IListPostsRequestDTO } from '../../DTOs/IListPostsRequestDTO';
import { PostsRepositories } from '../../repositories/PostsRepositories';

export class ListPostsService {
  async execute({ start, limit }: IListPostsRequestDTO) {
    const postsRepositories = getCustomRepository(PostsRepositories);

    const posts = await postsRepositories.findAndPaginate(start, limit);

    return posts;
  }
}
