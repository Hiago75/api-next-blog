import { EntityRepository, Raw, Repository } from 'typeorm';
import { Tags } from '../entities/Tags';

@EntityRepository(Tags)
export class TagsRepository extends Repository<Tags> {
  async findIdByName(tagName: string) {
    const tag = await this.findOne({ name: Raw((alias) => `LOWER(${alias})=LOWER('${tagName}')`) });

    const tagId = tag?.id;
    return tagId;
  }
}
