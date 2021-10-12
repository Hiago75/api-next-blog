import { EntityRepository, Repository } from 'typeorm';
import { Posts } from '../entities/Posts';

@EntityRepository(Posts)
export class PostsRepositories extends Repository<Posts> {
  private relations = [
    'cover',
    'cover.format',
    'cover.format.large',
    'cover.format.medium',
    'cover.format.small',
    'cover.format.thumbnail',
    'tags',
    'author',
    'category',
  ];

  findByCategory(categoryId?: string, skip?: number, take?: number) {
    return this.find({
      relations: this.relations,
      where: {
        categoryId,
      },
      order: {
        createdAt: 'DESC',
      },
      take: take,
      skip: skip,
    });
  }

  findAndPaginate(skip?: number, take?: number) {
    return this.find({
      relations: this.relations,
      order: {
        createdAt: 'DESC',
      },
      take: take,
      skip: skip,
    });
  }
}
