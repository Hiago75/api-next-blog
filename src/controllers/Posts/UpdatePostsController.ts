import { Request, Response } from 'express';
import { BadRequest } from '../../custom/errors';
import { UpdatePostsService } from '../../services';

export class UpdatePostsController {
  constructor(private updatePostsService: UpdatePostsService) {}

  async handle(request: Request, response: Response) {
    const { id } = request.params;
    const itemsToBeUpdated = request.body;

    if (!id) throw new BadRequest('post_deletion_missing_id');

    for (const item in itemsToBeUpdated) {
      if (!itemsToBeUpdated[item]) {
        delete itemsToBeUpdated[item];
      }
    }

    const updatedPost = await this.updatePostsService.execute({ postId: id, itemsToBeUpdated });

    return response.json(updatedPost);
  }
}
