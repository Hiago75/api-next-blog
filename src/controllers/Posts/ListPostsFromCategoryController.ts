import { Request, Response } from 'express';
import { ListPostsFromCategoryService } from '../../services/Posts/ListPostsFromCategoryService';

export class ListPostsFromCategoryController {
  constructor(private listPostsFromCategoryService: ListPostsFromCategoryService) {}
  async handle(request: Request, response: Response) {
    const { category } = request.params;

    const posts = await this.listPostsFromCategoryService.execute({ category });

    return response.json(posts);
  }
}
