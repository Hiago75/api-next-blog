import { EntityRepository, Repository } from 'typeorm';
import { Posts } from '../entities/Posts';

@EntityRepository(Posts)
export class PostsRepositories extends Repository<Posts> {
  findByCategory(skip: number, take: number, category: string) {
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
      where: {
        category: category,
      },
      order: {
        createdAt: 'DESC',
      },
      take: take,
      skip: skip,
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
