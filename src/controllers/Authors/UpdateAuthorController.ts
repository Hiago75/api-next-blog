import { Request, Response } from 'express';
import { UpdateAuthorService } from '../../services';

export class UpdateAuthorController {
  constructor(private updateAuthorService: UpdateAuthorService) {}

  async handle(req: Request, res: Response) {
    const userId = req.user_id;
    const { name, email, password } = req.body;

    const updatedData = await this.updateAuthorService.execute({ userId, name, email, password });

    return res.json(updatedData);
  }
}
