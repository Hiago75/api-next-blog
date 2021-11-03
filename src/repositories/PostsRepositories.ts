import { EntityRepository, Repository } from 'typeorm';
import { Posts } from '../entities/Posts';

interface IDyanamicObject {
  [key: string]: string | undefined | string[];
}

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

  async findAndPaginate(skip?: number, take?: number, categoryId?: string, authorId?: string) {
    const clauses: IDyanamicObject = {};

    const filterClauses = () => {
      const queries: IDyanamicObject = { categoryId: categoryId, authorId: authorId };

      for (const queryKey in queries) {
        const queryValue = queries[queryKey];

        if (queryValue !== undefined) clauses[queryKey] = queryValue;
      }
    };

    filterClauses();

    return this.find({
      relations: this.relations,
      where: {
        ...clauses,
      },
      order: {
        createdAt: 'DESC',
      },
      take: take,
      skip: skip,
    });
  }
}
