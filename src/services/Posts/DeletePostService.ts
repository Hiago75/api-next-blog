import { getCustomRepository } from 'typeorm';
import { IDeletePostsRequestDTO } from '../../DTOs/IDeletePostRequestDTO';
import { PostsRepositories } from '../../repositories';

export class DeletePostService {
  async execute({ postId }: IDeletePostsRequestDTO) {
    const postsRepositories = getCustomRepository(PostsRepositories);

    await postsRepositories.delete({ id: postId });
  }
}
