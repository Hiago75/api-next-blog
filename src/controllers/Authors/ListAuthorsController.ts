import { Request, Response } from 'express';
import { ListAuthorsService } from '../../services/Authors/ListAuthorsService';

export class ListAuthorsController {
  constructor(private listAuthorsService: ListAuthorsService) {}

  async handle(request: Request, response: Response) {
    const authors = await this.listAuthorsService.execute();
    return response.json(authors);
  }
}
