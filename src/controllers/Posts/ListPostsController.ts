import { Request, Response } from 'express';
import { ListPostsService } from '../../services/Posts/ListPostsService';

export class ListPostsController {
  constructor(private listPostsService: ListPostsService) {}

  async handle(request: Request, response: Response) {
    const { _start, _limit, _category } = request.query;

    const start = Number(_start);
    const limit = Number(_limit);
    const category = String(_category);

    const posts = await this.listPostsService.execute({ start, limit, category });

    return response.json(posts);
  }
}
