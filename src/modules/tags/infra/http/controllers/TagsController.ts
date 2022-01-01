import { Request, Response } from 'express';
import { DeleteTagService } from '@modules/tags/services/DeleteTagService';
import { CreateTagService } from '@modules/tags/services/CreateTagService';
import { ListTagsService } from '@modules/tags/services/ListTagsService'

class TagsController {
  public async index(request: Request, response: Response): Promise<Response> {
    const listTags = new ListTagsService();

    const tags = await listTags.execute();

    return response.json(tags);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { name } = request.body;
    const createTag = new CreateTagService();

    const tag = await createTag.execute({ name });

    return response.json(tag);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params
    const deleteTag = new DeleteTagService();

    await deleteTag.execute({ id });

    return response.status(204);
  }
}

export default TagsController
