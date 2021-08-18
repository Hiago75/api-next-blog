import { Request, Response } from 'express';
import slugify from 'slugify';
import { BadRequest } from '../../custom/errors';

import { CreatePostsService } from '../../services/Posts/CreatePostsService';

export class CreatePostsController {
  constructor(private createPostsService: CreatePostsService) {}

  async handle(request: Request, response: Response) {
    const authorId = request.user_id;
    const { title, content, categoryId, coverId } = request.body;

    if (!title) throw new BadRequest('post_creation_title_missing_error');
    if (!content) throw new BadRequest('post_creation_content_missing_error');
    if (!categoryId) throw new BadRequest('post_creation_categoryId_missing_error');
    if (!coverId) throw new BadRequest('post_coverId_title_missing_error');

    const slug = slugify(title);

    const post = await this.createPostsService.execute({
      title,
      content,
      slug,
      categoryId,
      authorId,
      coverId,
    });

    return response.json(post);
  }
}
