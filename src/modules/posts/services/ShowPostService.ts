import { BadRequest } from '@shared/errors';
import { IPostsRepository } from '../domain/repositories/IPostsRepository';
import { inject, injectable } from 'tsyringe';

import { IShowPost } from '../domain/model/IShowPost';

@injectable()
export class ShowPostService {
  constructor(
    @inject('PostsRepository')
    private postsRepository: IPostsRepository
  ) { }

  async execute({ slug }: IShowPost) {
    const post = await this.postsRepository.findBySlug(slug);

    if (!post) throw new BadRequest('post_not_found_error');

    return post;
  }
}
