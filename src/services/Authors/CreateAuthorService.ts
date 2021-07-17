import { getCustomRepository } from 'typeorm';
import { BadRequest } from '../../custom/errors';
import { IAuthorRequestDTO } from '../../DTOs/IAuthorRequestDTO';
import { AuthorsRepositories } from '../../repositories/AuthorsRepositories';

export class CreateAuthorService {
  async execute({ name }: IAuthorRequestDTO) {
    const authorsRepositories = getCustomRepository(AuthorsRepositories);

    if (!name) {
      throw new BadRequest('Author name is empty');
    }

    const author = authorsRepositories.create({ name });

    await authorsRepositories.save(author);

    return author;
  }
}
