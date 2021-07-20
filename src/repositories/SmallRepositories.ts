import { EntityRepository, Repository } from 'typeorm';
import { Small } from '../entities/Small';

@EntityRepository(Small)
export class SmallRepositories extends Repository<Small> {}
