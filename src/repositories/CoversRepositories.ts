import { EntityRepository, Repository } from 'typeorm';
import { Covers } from '../entities/Covers';

@EntityRepository(Covers)
export class CoversRepositories extends Repository<Covers> {}
