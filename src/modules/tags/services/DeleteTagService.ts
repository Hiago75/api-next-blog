import { getCustomRepository } from 'typeorm';
import { BadRequest } from '@shared/errors';
import { TagsRepository } from '../infra/typeorm/repositories/TagsRepository';
import { IDeleteTag } from '../domain/model/IDeleteTag';

export class DeleteTagService {
  async execute({ id }: IDeleteTag) {
    const tagsRepository = getCustomRepository(TagsRepository);

    // Verify if the tag exists
    const tagExists = await tagsRepository.findOne({ id });
    if (!tagExists) throw new BadRequest('tag_not_found_error');

    await tagsRepository.delete({ id });

    return { deleted: true };
  }
}
