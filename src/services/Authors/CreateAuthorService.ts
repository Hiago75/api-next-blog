import { getCustomRepository } from 'typeorm';
import { BadRequest } from '../../shared/errors';
import { IAuthorRequestDTO } from '../../DTOs/IAuthorRequestDTO';
import { AuthorsRepositories } from '../../repositories/AuthorsRepositories';
import { encrypt } from '../../shared/utils/encrypt';

export class CreateAuthorService {
  async execute({ name, email, password, admin }: IAuthorRequestDTO) {
    const authorsRepositories = getCustomRepository(AuthorsRepositories);

    const authorAlreadyExists = await authorsRepositories.findOne({ email: email });
    if (authorAlreadyExists) throw new BadRequest('user_creation_email_in_use');

    const passwordHash = await encrypt(password);

    const author = authorsRepositories.create({
      name,
      email,
      password: passwordHash,
      admin,
    });
    await authorsRepositories.save(author);

    return author;
  }
}
