import { Request, Response } from 'express';
import { BadRequest } from '../../custom/errors';
import { DeletePostService } from '../../services/Posts/DeletePostService';

export class DeletePostController {
  constructor(private deletePostService: DeletePostService) {}

  async handle(request: Request, response: Response) {
    const { postId } = request.body;

    if (!postId) throw new BadRequest('Post ID is obligatory');

    await this.deletePostService.execute({ postId });

    return response.status(200).json({
      deleted: true,
    });
  }
}
