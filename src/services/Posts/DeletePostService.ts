import { getCustomRepository } from 'typeorm';
import { BadRequest } from '../../custom/errors';
import { IDeletePostsRequestDTO } from '../../DTOs/IDeletePostRequestDTO';
import { PostsRepositories } from '../../repositories';

export class DeletePostService {
  async execute({ postId }: IDeletePostsRequestDTO) {
    const postsRepositories = getCustomRepository(PostsRepositories);
    const postExists = await postsRepositories.findOne({ id: postId });

    if (!postExists) throw new BadRequest('Post not found');

    await postsRepositories.delete({ id: postId });
  }
}
