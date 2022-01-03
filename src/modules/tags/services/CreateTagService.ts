import { BadRequest } from '@shared/errors';
import { ICreateTag } from '../domain/model/ICreateTag';
import { ITag } from '../domain/model/ITag';
import { inject, injectable } from 'tsyringe';
import { ITagsRepository } from '../domain/repositories/ITagsRepository';

@injectable()
export class CreateTagService {
  constructor(
    @inject('TagsRepository')
    private tagsRepository: ITagsRepository
  ) { }

  async execute({ name }: ICreateTag): Promise<ITag> {
    if (!name) throw new BadRequest('tag_creation_not_sent_name');

    const tagAlreadyExists = await this.tagsRepository.findByName(name);
    if (tagAlreadyExists) throw new BadRequest('tag_creation_already_exists');

    const tag = this.tagsRepository.create({ name });

    return tag;
  }
}
