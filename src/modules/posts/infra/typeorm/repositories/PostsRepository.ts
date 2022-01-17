import { IListPosts } from "@modules/posts/domain/model/IListsPosts";
import { IPost } from "@modules/posts/domain/model/IPost";
import { IUpdatePost } from "@modules/posts/domain/model/IUpdatePost";
import { IPostsRepository, IQuery } from "@modules/posts/domain/repositories/IPostsRepository";
import { getRepository, Repository } from "typeorm";
import { Post } from "../entities/Post";

interface IDyanamicObject {
  [key: string]: string | string[] | undefined;
}

export class PostsRepository implements IPostsRepository {
  private ormRepository: Repository<IPost>

  constructor() {
    this.ormRepository = getRepository(Post);
  }

  update({ postId, itemsToBeUpdated }: IUpdatePost): Promise<void> {
    throw new Error("Method not implemented.");
  }

  async count(query?: IQuery): Promise<number> {
    return await this.ormRepository.count(query);
  }

  async findBySlug(slug: string): Promise<IPost | undefined> {
    return this.ormRepository.findOne({
      where: { slug: slug },
      relations: [
        'cover',
        'cover.format',
        'cover.format.large',
        'cover.format.medium',
        'cover.format.small',
        'cover.format.thumbnail',
        'tags',
        'author',
        'category',
      ],
    })
  }

  async findByTitle(title: string): Promise<IPost | undefined> {
    return this.ormRepository.findOne({ where: title });
  }

  async findById(id: string): Promise<IPost | undefined> {
    return this.ormRepository.findOne(id);
  }

  async findAll({ start, limit, category, author }: IListPosts): Promise<IPost[] | undefined> {
    const clauses: IDyanamicObject = {};

    const filterClauses = () => {
      const queries: IDyanamicObject = { categoryId: category, authorId: author };

      for (const queryKey in queries) {
        const queryValue = queries[queryKey];

        if (queryValue !== undefined) clauses[queryKey] = queryValue;
      }
    };

    filterClauses();

    return this.ormRepository.find({
      order: {
        createdAt: 'DESC',
      },
      where: {
        ...clauses,
      },
      relations: [
        'cover',
        'cover.format',
        'cover.format.large',
        'cover.format.medium',
        'cover.format.small',
        'cover.format.thumbnail',
        'tags',
        'author',
        'category',
      ],
      take: start,
      skip: limit,
    });
  }

}
