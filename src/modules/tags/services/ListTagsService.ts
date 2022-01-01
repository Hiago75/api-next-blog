import { getCustomRepository } from 'typeorm';
import { TagsRepository } from '../infra/typeorm/repositories/TagsRepository';

export class ListTagsService {
  async execute() {
    const tagsRepository = getCustomRepository(TagsRepository);

    const tags = tagsRepository.find();

    return tags;
  }
}
