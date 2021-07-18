import { Request, Response } from 'express';
import slugify from 'slugify';

import { CreatePostsService } from '../../services/Posts/CreatePostsService';

export class CreatePostsController {
  constructor(private createPostsService: CreatePostsService) {}

  async handle(request: Request, response: Response) {
    const { title, content, categoryId, authorId, coverId } = request.body;
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
