import { Request, Response } from 'express';
import { BadRequest } from '../../custom/errors';
import { CreateAuthorService } from '../../services/Authors/CreateAuthorService';

export class CreateAuthorController {
  constructor(private createAuthorService: CreateAuthorService) {}

  async handle(request: Request, response: Response) {
    const { name, email, password, admin = false, profilePhotoId } = request.body;

    if (!name) throw new BadRequest('user_creation_not_sent_name');
    if (!email) throw new BadRequest('user_creation_not_sent_email');
    if (!password) throw new BadRequest('user_creation_not_sent_password');
    if (password.length < 5) throw new BadRequest('user_creation_password_short');

    const author = await this.createAuthorService.execute({ name, email, password, admin, profilePhotoId });

    return response.json(author);
  }
}
