import { getCustomRepository } from 'typeorm';
import { BadRequest } from '@shared/errors';
import { TagsRepository } from '../infra/typeorm/repositories/TagsRepository'
import { ICreateTag } from '../domain/model/ICreateTag';

export class CreateTagService {
  async execute({ name }: ICreateTag) {
    const tagsRepository = getCustomRepository(TagsRepository);
    if (!name) throw new BadRequest('tag_creation_not_sent_name');

    const tagAlreadyExists = await tagsRepository.findOne({ name });
    if (tagAlreadyExists) throw new BadRequest('tag_creation_already_exists');

    const tag = tagsRepository.create({ name });
    await tagsRepository.save(tag);

    return tag;
  }
}
