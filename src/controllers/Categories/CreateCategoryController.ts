import { Request, Response } from 'express';
import { BadRequest } from '../../shared/errors';
import { CreateCategoryService } from '../../services/Categories/CreateCategoryService';

export class CreateCategoryController {
  constructor(private createCategoryService: CreateCategoryService) { }

  async handle(request: Request, response: Response) {
    const { name } = request.body;
    if (!name) throw new BadRequest('category_creation_not_sent_name');

    const category = await this.createCategoryService.execute({ name });

    return response.json(category);
  }
}
