import { IAuthor } from '@modules/authors/domain/model/IAuthor';

import { ICreateAuthor } from '@modules/authors/domain/model/ICreateAuthor';
import { ICreateAuthorProfilePhoto } from '@modules/authors/domain/model/ICreateAuthorProfilePhoto';
import { IUpdateAuthor } from '@modules/authors/domain/model/IUpdateAuthor';
import { IAuthorsRepository } from '@modules/authors/domain/repositories/IAuthorsRepository';
import { BadRequest } from '@shared/errors';
import { getRepository, Raw, Repository } from 'typeorm';
import { Authors } from '../entities/Authors';

export class AuthorsRepository implements IAuthorsRepository {
  private ormRepository: Repository<IAuthor>

  constructor() {
    this.ormRepository = getRepository(Authors);
  }

  async findIdByName(authorName: string): Promise<string | undefined> {
    const author = await this.ormRepository.findOne({ name: Raw((alias) => `LOWER(${alias})=LOWER('${authorName}')`) });

    const authorId = author?.id;

    if (!authorId) throw new BadRequest('author_not_found');

    return authorId;
  }

  findByEmail(email: string): Promise<IAuthor | undefined> {
    return this.ormRepository.findOne({ where: { email: email } });
  }

  async findById(id: string): Promise<IAuthor | undefined> {
    return this.ormRepository.findOne({ where: { id }, relations: ['profilePhoto'] });
  }

  async findAll(): Promise<IAuthor[]> {
    return this.ormRepository.find({ order: { name: 'ASC' }, relations: ['profilePhoto'] });
  }

  async create({ name, email, password, admin }: ICreateAuthor) {
    const author = this.ormRepository.create({ name, email, password, admin });

    await this.ormRepository.save(author);

    return author;
  }

  async update({ user_id, itemsSentToUpdate }: IUpdateAuthor): Promise<IAuthor> {
    const author = await this.ormRepository.findOne(user_id);
    if (!author) throw new BadRequest('user_not_found');
    const { name, email } = itemsSentToUpdate;

    author.name = name || author?.name;
    author.email = email || author?.email;

    await this.ormRepository.save(author);

    return author;
  }

  async createAuthorsProfilePhoto({ user_id, photo }: ICreateAuthorProfilePhoto): Promise<IAuthor> {
    const author = await this.ormRepository.findOne(user_id);
    if (!author) throw new BadRequest('user_not_found');

    author.profilePhoto = photo;

    await this.ormRepository.save(author);

    return author;
  }
}
