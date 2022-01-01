import jwtDecode from 'jwt-decode';
import { getCustomRepository } from 'typeorm';
import { BadRequest } from '../../shared/errors';
import { AuthorsRepositories } from '../../repositories';

interface IUser {
  sub: string;
}

export class RetrieveUserDataService {
  async execute(token: string) {
    const authorsRepositories = getCustomRepository(AuthorsRepositories);

    const { sub: id } = jwtDecode<IUser>(token);

    const user = await authorsRepositories.findOneWithPhoto(id);
    if (!user) throw new BadRequest('user_not_found_error');

    return user;
  }
}
