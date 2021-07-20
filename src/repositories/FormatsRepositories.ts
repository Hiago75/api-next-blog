import { EntityRepository, Repository } from 'typeorm';
import { Formats } from '../entities/Formats';

@EntityRepository(Formats)
export class FormatsRepositories extends Repository<Formats> {}
