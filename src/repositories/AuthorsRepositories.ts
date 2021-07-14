import { EntityRepository, Repository } from 'typeorm';
import { Authors } from '../entities/Authors';

@EntityRepository(Authors)
export class AuthorsRepositories extends Repository<Authors> {}
