import { inject, injectable } from 'tsyringe';
import { IAuthorsRepository } from '../domain/repositories/IAuthorsRepository';

@injectable()
export class ListAuthorsService {
  constructor(
    @inject('AuthorsRepository')
    private authorsRepository: IAuthorsRepository,
  ) { }

  async execute() {
    const authors = await this.authorsRepository.findAll();

    return authors;
  }
}
