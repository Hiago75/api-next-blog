import { Request, Response } from 'express';
import { CreateCategoryService } from '../../services/Categories/CreateCategoryService';

export class CreateCategoryController {
  constructor(private createCategoryService: CreateCategoryService) {}

  async handle(request: Request, response: Response) {
    const { name } = request.body;
    console.log(name);

    const category = await this.createCategoryService.execute({ name });

    return response.json(category);
  }
}
