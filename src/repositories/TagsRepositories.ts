import { EntityRepository, Repository } from 'typeorm';
import { Tags } from '../entities/Tags';

@EntityRepository(Tags)
export class TagsRepositories extends Repository<Tags> {}
