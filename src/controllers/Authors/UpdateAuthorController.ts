import { Request, Response } from 'express';
import { UpdateAuthorService } from '../../services';

export class UpdateAuthorController {
  constructor(private updateAuthorService: UpdateAuthorService) {}

  async handle(req: Request, res: Response) {
    const userId = req.user_id;
    const itemsToBeUpdated = req.body;

    for (const item in itemsToBeUpdated) {
      if (!itemsToBeUpdated[item]) {
        delete itemsToBeUpdated[item];
      }
    }

    const updatedData = await this.updateAuthorService.execute(userId, itemsToBeUpdated);

    return res.json(updatedData);
  }
}
