import { Request, Response } from 'express';
import { CreateAuthorService } from '../../services/Authors/CreateAuthorService';

export class CreateAuthorController {
  constructor(private createAuthorService: CreateAuthorService) {}

  async handle(request: Request, response: Response) {
    const { name } = request.body;

    const author = await this.createAuthorService.execute({ name });

    return response.json(author);
  }
}
