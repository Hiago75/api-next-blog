import { Request, Response } from 'express';
import { ShowAuthorService } from '../../services/Authors/ShowAuthorService';

export class ShowAuthorController {
  constructor(private showAuthorService: ShowAuthorService) {}

  async handle(request: Request, response: Response) {
    const { id } = request.params;

    const author = await this.showAuthorService.execute({ id });

    return response.json(author);
  }
}
