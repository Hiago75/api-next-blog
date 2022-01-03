import { getCustomRepository } from 'typeorm';
import { BadRequest } from '@shared/errors';
import { TagsRepository } from '../infra/typeorm/repositories/TagsRepository'
import { ICreateTag } from '../domain/model/ICreateTag';
import { ITag } from '../domain/model/ITag';

export class CreateTagService {
  async execute({ name }: ICreateTag): Promise<ITag> {
    const tagsRepository = getCustomRepository(TagsRepository);
    if (!name) throw new BadRequest('tag_creation_not_sent_name');

    const tagAlreadyExists = await tagsRepository.findByName(name);
    if (tagAlreadyExists) throw new BadRequest('tag_creation_already_exists');

    const tag = tagsRepository.create({ name });

    return tag;
  }
}
