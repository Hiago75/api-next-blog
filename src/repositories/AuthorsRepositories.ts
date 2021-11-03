import { EntityRepository, Raw, Repository } from 'typeorm';
import { Authors } from '../entities/Authors';

@EntityRepository(Authors)
export class AuthorsRepositories extends Repository<Authors> {
  async findIdByName(authorName: string) {
    const author = await this.findOne({ name: Raw((alias) => `LOWER(${alias})=LOWER('${authorName}')`) });

    const authorId = author?.id;
    return authorId;
  }

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
