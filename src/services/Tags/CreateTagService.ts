import { getCustomRepository } from 'typeorm';
import { BadRequest } from '../../custom/errors';
import { ICreateTagRequestDTO } from '../../DTOs/ICreateTagRequestDTO';
import { TagsRepositories } from '../../repositories/TagsRepositories';

export class CreateTagService {
  async execute({ name }: ICreateTagRequestDTO) {
    const tagsRepositories = getCustomRepository(TagsRepositories);
    if (!name) throw new BadRequest('tag_creation_not_sent_name');

    const tagAlreadyExists = await tagsRepositories.findOne({ name });
    if (tagAlreadyExists) throw new BadRequest('tag_creation_already_exists');

    const tag = tagsRepositories.create({ name });
    await tagsRepositories.save(tag);

    return tag;
  }
}
