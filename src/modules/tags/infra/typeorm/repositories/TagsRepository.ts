import { ICreateTag } from '@modules/tags/domain/model/ICreateTag';
import { IDeleteTag } from '@modules/tags/domain/model/IDeleteTag';
import { ITag } from '@modules/tags/domain/model/ITag';
import { ITagsRepository } from '@modules/tags/domain/repositories/ITagsRepository';
import { getRepository, Raw, Repository } from 'typeorm';
import { Tags } from '../entities/Tags';

export class TagsRepository implements ITagsRepository {
  private ormRepository: Repository<ITag>;

  constructor() {
    this.ormRepository = getRepository(Tags);
  }

  async create({ name }: ICreateTag): Promise<ITag> {
    const newTag = this.ormRepository.create({ name });

    await this.ormRepository.save(newTag);

    return newTag;
  }

  async findAll(): Promise<ITag[]> {
    return await this.ormRepository.find();
  }

  async findByName(name: string): Promise<ITag | undefined> {
    return await this.ormRepository.findOne({ name })
  }

  async findById(id: string): Promise<ITag | undefined> {
    return await this.ormRepository.findOne({ id })
  }

  async getIdByName(tagName: string) {
    const tag = await this.ormRepository.findOne({ name: Raw((alias) => `LOWER(${alias})=LOWER('${tagName}')`) });

    const tagId = tag?.id;
    return tagId;
  }

  async delete({ id }: IDeleteTag): Promise<void> {
    await this.ormRepository.delete({ id });
  }
}
