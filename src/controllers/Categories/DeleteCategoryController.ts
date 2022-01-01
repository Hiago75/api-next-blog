import { Request, Response } from 'express';
import { BadRequest } from '../../shared/errors';
import { DeleteCategoryService } from '../../services/Categories/DeleteCategoryService';

export class DeleteCategoryController {
  constructor(private deleteCategoryService: DeleteCategoryService) { }

  async handle(request: Request, response: Response) {
    const { id } = request.params;

    if (!id) throw new BadRequest('category_deletion_missing_id');

    await this.deleteCategoryService.execute({ categoryId: id });

    return response.json({
      deleted: true,
    });
  }
}
