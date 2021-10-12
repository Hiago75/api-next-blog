import { Request, Response } from 'express';
import { ListTagsService } from '../../services';

export class ListTagsController {
  constructor(private listTagsService: ListTagsService) {}

  async handle(request: Request, response: Response) {
    const tags = await this.listTagsService.execute();

    return response.json(tags);
  }
}
