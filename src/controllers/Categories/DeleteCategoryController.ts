import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import { BadRequest } from '../../custom/errors';
import { CategoriesRepositories } from '../../repositories';
import { DeleteCategoryService } from '../../services/Categories/DeleteCategoryService';

export class DeleteCategoryController {
  constructor(private deleteCategoryService: DeleteCategoryService) {}

  async handle(request: Request, response: Response) {
    const { categoryId } = request.body;
    const categoriesRepositories = getCustomRepository(CategoriesRepositories);

    const categoryExists = await categoriesRepositories.findOne({ id: categoryId });

    if (!categoryId) throw new BadRequest('Category ID is obligatory');
    if (!categoryExists) throw new BadRequest('Category not found');

    await this.deleteCategoryService.execute({ categoryId });

    return response.status(200).json({
      deleted: true,
    });
  }
}
