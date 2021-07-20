import { EntityRepository, Repository } from 'typeorm';
import { Posts } from '../entities/Posts';

@EntityRepository(Posts)
export class PostsRepositories extends Repository<Posts> {
  findAndOrder() {
    return this.find({
      relations: [
        'cover',
        'cover.format',
        'cover.format.large',
        'cover.format.medium',
        'cover.format.small',
        'cover.format.thumbnail',
        'author',
        'category',
      ],
      order: {
        createdAt: 'DESC',
      },
    });
  }

  findAndPaginate(skip: number, take: number) {
    return this.find({
      relations: [
        'cover',
        'cover.format',
        'cover.format.large',
        'cover.format.medium',
        'cover.format.small',
        'cover.format.thumbnail',
        'author',
        'category',
      ],
      order: {
        createdAt: 'DESC',
      },
      take: take,
      skip: skip,
    });
  }
}
