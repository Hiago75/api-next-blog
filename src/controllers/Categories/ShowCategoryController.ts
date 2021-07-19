import { Request, Response } from 'express';
import { ShowCategoryService } from '../../services/Categories/ShowCategoryService';

export class ShowCategoryController {
  constructor(private showCategoryService: ShowCategoryService) {}

  async handle(request: Request, response: Response) {
    const { id } = request.params;

    const category = await this.showCategoryService.execute({ id });

    return response.json(category);
  }
}
