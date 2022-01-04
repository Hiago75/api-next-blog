import { injectable, inject } from 'tsyringe';
import { BadRequest } from '@shared/errors';
import { IAuthorsRepository } from '../domain/repositories/IAuthorsRepository';
import { IShowAuthor } from '../domain/model/IShowAuthor';

@injectable()
export class ShowAuthorService {
  constructor(
    @inject('AuthorsRepository')
    private authorsRepository: IAuthorsRepository,
  ) { }

  async execute({ id }: IShowAuthor) {
    const author = await this.authorsRepository.findById(id);

    if (!author) throw new BadRequest('user_not_found_error');

    return author;
  }
}
