import { Request, Response } from 'express';
import { BadRequest } from '../../custom/errors';
import { DeletePostService } from '../../services/Posts/DeletePostService';

export class DeletePostController {
  constructor(private deletePostService: DeletePostService) {}

  async handle(request: Request, response: Response) {
    const { postId } = request.body;
    if (!postId) throw new BadRequest('post_deletion_missing_id');

    await this.deletePostService.execute({ postId });

    return response.json({
      deleted: true,
    });
  }
}
