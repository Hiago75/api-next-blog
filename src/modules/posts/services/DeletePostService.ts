import { inject, injectable } from 'tsyringe';
import { BadRequest } from '@shared/errors';
import { IDeletePost } from '../domain/model/IDeletePost';
import { IPostsRepository } from '../domain/repositories/IPostsRepository';

@injectable()
export class DeletePostService {
  constructor(
    @inject('PostsRepository')
    private postsRepository: IPostsRepository,
  ) { }

  async execute({ postId }: IDeletePost) {
    const postExists = await this.postsRepository.findById(postId);

    if (!postExists) throw new BadRequest('post_not_found_error');

    await this.postsRepository.delete(postId);

    return { deleted: true };
  }
}
