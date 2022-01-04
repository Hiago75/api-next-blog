import { inject, injectable } from 'tsyringe';
import { BadRequest } from '@shared/errors';
import { ICreateAuthor } from '@modules/authors/domain/model/ICreateAuthor';
import { IAuthorsRepository } from '@modules/authors/domain/repositories/IAuthorsRepository';
import { IHashProvider } from '@modules/authors/providers/HashProvider/models/IHashProvider';

@injectable()
export class CreateAuthorService {
  constructor(
    @inject('AuthorsRepository')
    private authorsRepository: IAuthorsRepository,
    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) { }

  async execute({ name, email, password, admin = false }: ICreateAuthor) {
    const authorAlreadyExists = await this.authorsRepository.findByEmail(email);
    if (authorAlreadyExists) throw new BadRequest('user_creation_email_in_use');

    const passwordHash = await this.hashProvider.generateHash(password);

    const author = this.authorsRepository.create({
      name,
      email,
      password: passwordHash,
      admin,
    })

    return author;
  }
}
