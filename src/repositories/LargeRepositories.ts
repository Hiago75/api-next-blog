import { EntityRepository, Repository } from 'typeorm';
import { Large } from '../entities/Large';

@EntityRepository(Large)
export class LargeRepositories extends Repository<Large> {}
