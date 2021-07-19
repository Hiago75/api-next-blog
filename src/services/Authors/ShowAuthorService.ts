import { getCustomRepository } from 'typeorm';
import { BadRequest } from '../../custom/errors';
import { IShowAuthorRequestDTO } from '../../DTOs/IShowAuthorRequestDTO';
import { AuthorsRepositories } from '../../repositories';

export class ShowAuthorService {
  async execute({ id }: IShowAuthorRequestDTO) {
    const authorRepositories = getCustomRepository(AuthorsRepositories);
    const author = await authorRepositories.findOne({ id: id });

    if (!author) {
      throw new BadRequest('Author not found');
    }

    return author;
  }
}
