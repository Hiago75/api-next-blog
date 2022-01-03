import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { DeleteTagService } from '@modules/tags/services/DeleteTagService';
import { CreateTagService } from '@modules/tags/services/CreateTagService';
import { ListTagsService } from '@modules/tags/services/ListTagsService';

class TagsController {
  public async index(request: Request, response: Response): Promise<Response> {
    const listTags = container.resolve(ListTagsService);

    const tags = await listTags.execute();

    return response.json(tags);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { name } = request.body;
    const createTag = container.resolve(CreateTagService);

    const tag = await createTag.execute({ name });

    return response.json(tag);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    // TODO: Fix the table relations
    const { id } = request.params
    const deleteTag = container.resolve(DeleteTagService);

    await deleteTag.execute({ id });

    return response.status(204);

  }
}

export default TagsController
