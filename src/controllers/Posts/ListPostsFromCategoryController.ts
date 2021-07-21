import { Request, Response } from 'express';
import { ListPostsFromCategoryService } from '../../services/Posts/ListPostsFromCategoryService';

export class ListPostsFromCategoryController {
  constructor(private listPostsFromCategoryService: ListPostsFromCategoryService) {}
  async handle(request: Request, response: Response) {
    const { _start, _limit } = request.query;
    const { category } = request.params;

    const start = Number(_start);
    const limit = Number(_limit);

    const posts = await this.listPostsFromCategoryService.execute({ category, start, limit });

    return response.json(posts);
  }
}
