import { Request, Response } from 'express';
import { BadRequest } from '../../custom/errors';
import { CreateTagService } from '../../services';

export class CreateTagController {
  constructor(private createTagService: CreateTagService) {}

  async handle(request: Request, response: Response) {
    const { name } = request.body;
    if (!name) throw new BadRequest('tag_creation_not_sent_name');

    const tag = await this.createTagService.execute({ name });

    return response.json(tag);
  }
}
