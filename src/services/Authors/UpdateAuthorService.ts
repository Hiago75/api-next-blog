import { getCustomRepository } from 'typeorm';
import { IUpdateAuthorRequestDTO } from '../../DTOs/IUpdateAuthorRequestDTO';
import { AuthorsRepositories } from '../../repositories';

export class UpdateAuthorService {
  async execute(userId: string, itemsToBeUpdated: IUpdateAuthorRequestDTO) {
    const authorsRepositories = getCustomRepository(AuthorsRepositories);

    await authorsRepositories.update(userId, itemsToBeUpdated);

    const updatedUser = await authorsRepositories.findOneWithPhoto(userId);

    return updatedUser;
  }
}
