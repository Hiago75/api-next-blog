import { Request, Response } from 'express';
import { ListPostsService } from '../../services/Posts/ListPostsService';

export class ListPostsController {
  constructor(private listPostsService: ListPostsService) {}

  async handle(request: Request, response: Response) {
    const posts = await this.listPostsService.execute();

    return response.json(posts);
  }
}
