import axios from 'axios';
import { Request, Response } from 'express';
import { BadRequest } from '../../custom/errors';
import { UpdatePostsService } from '../../services';

export class UpdatePostsController {
  constructor(private updatePostsService: UpdatePostsService) { }

  async handle(request: Request, response: Response) {
    const { id } = request.params;
    const itemsToBeUpdated = request.body;

    if (!id) throw new BadRequest('post_deletion_missing_id');

    for (const item in itemsToBeUpdated) {
      if (!itemsToBeUpdated[item]) {
        delete itemsToBeUpdated[item];
      }
    }

    try {
      const updatedPost = await this.updatePostsService.execute({ postId: id, itemsToBeUpdated });

      if (process.env.NODE_ENV === 'production')
        axios.post('https://api.netlify.com/build_hooks/61675fa4f2f8f62777bca770');

      return response.json(updatedPost);
    } catch (e) {
      console.log(e);
    }
  }
}
