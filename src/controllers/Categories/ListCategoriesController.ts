import { Request, Response } from 'express';
import { ListCategoriesService } from '../../services/Categories/ListCategoriesService';

export class ListCategoriesController {
  constructor(private listCategoriesService: ListCategoriesService) {}

  async handle(request: Request, response: Response) {
    const categories = await this.listCategoriesService.execute();

    return response.json(categories);
  }
}
