import { getCustomRepository } from 'typeorm';
import { IAuthorRequestDTO } from '../../DTOs/IAuthorRequestDTO';
import { AuthorsRepositories } from '../../repositories/AuthorsRepositories';

export class CreateAuthorService {
  async execute({ name }: IAuthorRequestDTO) {
    const authorsRepositories = getCustomRepository(AuthorsRepositories);

    if (!name) {
      throw new Error('Author name is empty');
    }

    const author = authorsRepositories.create({ name });

    await authorsRepositories.save(author);

    return author;
  }
}
