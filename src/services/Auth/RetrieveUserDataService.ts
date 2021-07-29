import jwtDecode from 'jwt-decode';
import { getCustomRepository } from 'typeorm';
import { BadRequest } from '../../custom/errors';
import { AuthorsRepositories } from '../../repositories';

interface IUser {
  sub: string;
}

export class RetrieveUserDataService {
  async execute(token: string) {
    const authorsRepositories = getCustomRepository(AuthorsRepositories);

    const { sub: id } = jwtDecode<IUser>(token);
    const user = await authorsRepositories.findOne({ id });

    if (!user) throw new BadRequest(`User doesn't exists`);

    return user;
  }
}
