import { injectable, inject } from 'tsyringe';
import { IUpdateAuthor } from '../domain/model/IUpdateAuthor';
import { IAuthorsRepository } from '../domain/repositories/IAuthorsRepository';

@injectable()
export class UpdateAuthorService {
  constructor(
    @inject('AuthorsRepository')
    private authorRepository: IAuthorsRepository,
  ) { }

  async execute({ user_id, itemsSentToUpdate }: IUpdateAuthor) {
    const acceptedFields = ['name', 'email'];

    for (const item in itemsSentToUpdate) {
      if (!acceptedFields.includes(item)) {
        return delete itemsSentToUpdate[item];
      }

      if (!itemsSentToUpdate[item]) {
        delete itemsSentToUpdate[item];
      }
    };

    const updatedUser = await this.authorRepository.update({ user_id, itemsSentToUpdate });

    return updatedUser;
  }
}
