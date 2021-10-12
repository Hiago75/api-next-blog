import { getCustomRepository } from 'typeorm';
import { BadRequest } from '../../custom/errors';
import { IDeleteTagRequestDTO } from '../../DTOs/IDeleteTagRequestDTO';
import { TagsRepositories } from '../../repositories/TagsRepositories';

export class DeleteTagService {
  async execute({ tagId }: IDeleteTagRequestDTO) {
    const tagsRepositories = getCustomRepository(TagsRepositories);

    // Verify if the tag exists
    const tagExists = await tagsRepositories.findOne({ id: tagId });
    if (!tagExists) throw new BadRequest('tag_not_found_error');

    await tagsRepositories.delete({ id: tagId });

    return { deleted: true };
  }
}
