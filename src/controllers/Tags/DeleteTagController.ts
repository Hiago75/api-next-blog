import { Request, Response } from 'express';
import { BadRequest } from '../../custom/errors';
import { DeleteTagService } from '../../services/Tags/DeleteTagService';

export class DeleteTagController {
  constructor(private deleteTagService: DeleteTagService) {}

  async handle(request: Request, response: Response) {
    const { id } = request.params;
    if (!id) throw new BadRequest('tag_missing_id');

    await this.deleteTagService.execute({ tagId: id });

    return response.json({
      deleted: true,
    });
  }
}
