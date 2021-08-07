import { getCustomRepository } from 'typeorm';
import { IUpdateAuthorRequestDTO } from '../../DTOs/IUpdateAuthorRequestDTO';
import { AuthorsRepositories } from '../../repositories';

export class UpdateAuthorService {
  async execute({ userId, name, email, password }: IUpdateAuthorRequestDTO) {
    const authorsRepositories = getCustomRepository(AuthorsRepositories);

    await authorsRepositories.update(userId, {
      name,
      email,
      password,
    });

    const updatedUser = await authorsRepositories.findOne(userId);

    return updatedUser;
  }
}
