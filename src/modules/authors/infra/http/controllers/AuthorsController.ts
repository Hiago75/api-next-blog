import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { ListAuthorsService } from '@modules/authors/services/ListAuthorsService';
import { ShowAuthorService } from '@modules/authors/services/ShowAuthorService';
import { CreateAuthorService } from '@modules/authors/services/CreateAuthorService';
import { UpdateAuthorService } from '@modules/authors/services/UpdateAuthorService';

class AuthorsController {
  public async index(request: Request, response: Response): Promise<Response> {
    const listAuthors = container.resolve(ListAuthorsService)

    const authors = await listAuthors.execute();

    return response.json(authors);
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const showAuthor = container.resolve(ShowAuthorService);

    const author = await showAuthor.execute({ id });

    return response.json(author);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { name, email, password, admin } = request.body;
    const createAuthor = container.resolve(CreateAuthorService);

    const author = await createAuthor.execute({ name, email, password, admin });

    return response.json(author);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const user_id = request.user_id;
    const itemsSentToUpdate = request.body;
    const updateAuthor = container.resolve(UpdateAuthorService);

    const author = await updateAuthor.execute({ user_id, itemsSentToUpdate })

    return response.json(author);
  }
}

export default AuthorsController
