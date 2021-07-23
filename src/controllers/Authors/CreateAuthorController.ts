import { Request, Response } from 'express';
import { BadRequest } from '../../custom/errors';
import { CreateAuthorService } from '../../services/Authors/CreateAuthorService';

export class CreateAuthorController {
  constructor(private createAuthorService: CreateAuthorService) {}

  async handle(request: Request, response: Response) {
    const { name, email, password, admin = false } = request.body;

    if (!name) throw new BadRequest('Name is empty');
    if (!email) throw new BadRequest('Email is empty');
    if (!password) throw new BadRequest('Password is empty');

    const author = await this.createAuthorService.execute({ name, email, password, admin });
    return response.json(author);
  }
}
