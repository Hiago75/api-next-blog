import { Request, Response } from 'express';
import { BadRequest } from '../../custom/errors';
import { DeletePostService } from '../../services/Posts/DeletePostService';

export class DeletePostController {
  constructor(private deletePostService: DeletePostService) {}

  async handle(request: Request, response: Response) {
    const { id } = request.params;
    if (!id) throw new BadRequest('post_deletion_missing_id');

    await this.deletePostService.execute({ postId: id });

    return response.json({
      deleted: true,
    });
  }
}
