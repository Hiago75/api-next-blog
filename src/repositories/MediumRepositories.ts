import { EntityRepository, Repository } from 'typeorm';
import { Medium } from '../entities/Medium';

@EntityRepository(Medium)
export class MediumRepositories extends Repository<Medium> {}
