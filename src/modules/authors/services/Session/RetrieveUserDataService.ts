import jwtDecode from 'jwt-decode';
import { BadRequest } from '@shared/errors';
import { IAuthorsRepository } from '@modules/authors/domain/repositories/IAuthorsRepository';
import { inject, injectable } from 'tsyringe';

interface IUser {
  sub: string;
}

@injectable()
export class RetrieveUserDataService {
  constructor(
    @inject('AuthorsRepository')
    private authorsRepository: IAuthorsRepository,
  ) { }

  async execute(token: string) {
    const { sub: id } = jwtDecode<IUser>(token);

    const user = await this.authorsRepository.findById(id);
    if (!user) throw new BadRequest('user_not_found_error');

    return user;
  }
}
