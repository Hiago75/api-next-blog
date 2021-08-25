import { EntityRepository, Repository } from 'typeorm';
import { Authors } from '../entities/Authors';

@EntityRepository(Authors)
export class AuthorsRepositories extends Repository<Authors> {
  findByEmail(email: string) {
    return this.findOne({ where: { email: email } });
  }

  findOneWithPhoto(userId: string) {
    return this.findOne({ where: { id: userId }, relations: ['profilePhoto'] });
  }

  findWithPhoto() {
    return this.find({ order: { name: 'ASC' }, relations: ['profilePhoto'] });
  }
}
