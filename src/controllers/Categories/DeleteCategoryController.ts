import { Request, Response } from 'express';
import { BadRequest } from '../../custom/errors';
import { DeleteCategoryService } from '../../services/Categories/DeleteCategoryService';

export class DeleteCategoryController {
  constructor(private deleteCategoryService: DeleteCategoryService) {}

  async handle(request: Request, response: Response) {
    const { categoryId } = request.body;

    if (!categoryId) throw new BadRequest('Category ID is obligatory');

    await this.deleteCategoryService.execute({ categoryId });

    return response.status(200).json({
      deleted: true,
    });
  }
}
