import { getCustomRepository } from 'typeorm';
import { AuthorsRepositories } from '../../repositories/AuthorsRepositories';

export class ListAuthorsService {
  async execute() {
    const authorsRepositories = getCustomRepository(AuthorsRepositories);

    const authors = await authorsRepositories.findWithPhoto();

    return authors;
  }
}
