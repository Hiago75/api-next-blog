import { Request, Response } from 'express';
import { ListPostsService } from '../../services/Posts/ListPostsService';

export class ListPostsController {
  // eslint-disable-next-line prettier/prettier
  constructor(private listPostsService: ListPostsService) { }

  async handle(request: Request, response: Response) {
    const { _start, _limit, _category, _author } = request.query;

    const start = Number(_start);
    const limit = Number(_limit);
    const category = String(_category);
    const author = String(_author);

    const posts = await this.listPostsService.execute({ start, limit, category, author });

    return response.json(posts);
  }
}
