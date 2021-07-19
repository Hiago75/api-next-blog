import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import { BadRequest } from '../../custom/errors';
import { CategoriesRepositories } from '../../repositories';
import { ShowCategoryService } from '../../services/Categories/ShowCategoryService';

export class ShowCategoryController {
  constructor(private showCategoryService: ShowCategoryService) {}

  async handle(request: Request, response: Response) {
    const { id } = request.params;
    const categoriesRepositories = getCustomRepository(CategoriesRepositories);
    const categoryExists = await categoriesRepositories.findOne({ id });

    if (!categoryExists) {
      throw new BadRequest('ID not found');
    }

    const category = await this.showCategoryService.execute({ id });

    return response.json(category);
  }
}
