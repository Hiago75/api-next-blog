import { Request, Response } from 'express';
import { CreateCoversController } from '../../controllers';
import { CreatePostsService } from '../../services/Posts/CreatePostsService';

export class CreatePostsController {
  constructor(private createPostsService: CreatePostsService, private createCoverController: CreateCoversController) {}

  async handle(request: Request, response: Response) {
    // TODO: Refactor
    const { title, content, categoryId, authorId, coverId } = request.body;
    // const cover = await this.createCoverController.handle(request, response);

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
