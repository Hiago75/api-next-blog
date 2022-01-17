import slugify from 'slugify';
import { inject, injectable } from 'tsyringe';
import { BadRequest } from '@shared/errors';
import { IPostsRepository } from '../domain/repositories/IPostsRepository';
import { IUpdatePost } from '../domain/model/IUpdatePost';

@injectable()
export class UpdatePostsService {
  constructor(
    @inject('PostsRepository')
    private postsRepository: IPostsRepository
  ) { }

  async execute({ postId, itemsToBeUpdated }: IUpdatePost) {
    const postExists = await this.postsRepository.findById(postId);
    if (!postExists) throw new BadRequest('post_not_found_error');

    // if the user send a title update the slug to
    if (itemsToBeUpdated.title) {
      const title = itemsToBeUpdated.title;
      const titleUsed = await this.postsRepository.findByTitle(title);

      if (titleUsed) throw new BadRequest('post_creation_title_in_use');
      const updatedSlug = slugify(title);

      itemsToBeUpdated.slug = updatedSlug;
    }

    await this.postsRepository.update({ postId, itemsToBeUpdated });
    const updatedPosts = await this.postsRepository.findById(postId);

    return updatedPosts;
  }
}
