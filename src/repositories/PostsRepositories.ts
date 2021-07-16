import { EntityRepository, Repository } from 'typeorm';
import { Posts } from '../entities/Posts';

@EntityRepository(Posts)
export class PostsRepositories extends Repository<Posts> {}
