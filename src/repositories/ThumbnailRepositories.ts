import { EntityRepository, Repository } from 'typeorm';
import { Thumbnail } from '../entities/Thumbnail';

@EntityRepository(Thumbnail)
export class ThumbnailRepositories extends Repository<Thumbnail> {}
