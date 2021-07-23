import { EntityRepository, Repository } from 'typeorm';
import { Authors } from '../entities/Authors';

@EntityRepository(Authors)
export class AuthorsRepositories extends Repository<Authors> {
  findByEmail(email: string) {
    return this.findOne({ where: { email: email } });
  }
}
