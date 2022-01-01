import axios from 'axios';
import { Request, Response } from 'express';
import { BadRequest } from '../../shared/errors';
import { DeletePostService } from '../../services/Posts/DeletePostService';

export class DeletePostController {
  constructor(private deletePostService: DeletePostService) { }

  async handle(request: Request, response: Response) {
    const { id } = request.params;
    if (!id) throw new BadRequest('post_deletion_missing_id');

    await this.deletePostService.execute({ postId: id });

    if (process.env.NODE_ENV === 'production')
      axios.post('https://api.netlify.com/build_hooks/61675fa4f2f8f62777bca770');

    return response.json({
      deleted: true,
    });
  }
}
