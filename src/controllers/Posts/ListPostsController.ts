import { Request, Response } from 'express';
import { ListPostsService } from '../../services/Posts/ListPostsService';

export class ListPostsController {
  constructor(private listPostsService: ListPostsService) {}

  async handle(request: Request, response: Response) {
    const { start, limit } = request.query;

    const skip = Number(start);
    const take = Number(limit);

    const posts = await this.listPostsService.execute(skip, take);

    return response.json(posts);
  }
}
