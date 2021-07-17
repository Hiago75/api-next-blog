import { Request, Response } from 'express';
import { CreatePostsService } from '../../services/Posts/CreatePostsService';

export class CreatePostsController {
  constructor(private createPostsService: CreatePostsService) {}

  async handle(request: Request, response: Response) {
    // TODO: Refactor
    const { title, content, categoryId, authorId, coverId } = request.body;

    // TODO: Slug  be dynamic
    const post = await this.createPostsService.execute({
      title,
      content,
      slug: 'slug',
      categoryId,
      authorId,
      coverId,
    });

    return response.json(post);
  }
}
