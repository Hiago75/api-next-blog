import { getCustomRepository } from 'typeorm';
import slugify from 'slugify';

import { BadRequest } from '../../shared/errors';
import { IUpdatePostsRequestDTO } from '../../DTOs/IUpdatePostsRequestDTO';
import { PostsRepositories } from '../../repositories';

export class UpdatePostsService {
  async execute({ postId, itemsToBeUpdated }: IUpdatePostsRequestDTO) {
    const postsRepositories = getCustomRepository(PostsRepositories);

    const postExists = await postsRepositories.findOne({ id: postId });
    if (!postExists) throw new BadRequest('post_not_found_error');

    // if the user send a title update the slug to
    if (itemsToBeUpdated.title) {
      const title = itemsToBeUpdated.title;
      const titleUsed = await postsRepositories.findOne({ title });

      if (titleUsed) throw new BadRequest('post_creation_title_in_use');
      const updatedSlug = slugify(title);

      itemsToBeUpdated.slug = updatedSlug;
    }

    await postsRepositories.update(postId, itemsToBeUpdated);
    const updatedPosts = await postsRepositories.findOne(postId);

    return updatedPosts;
  }
}
