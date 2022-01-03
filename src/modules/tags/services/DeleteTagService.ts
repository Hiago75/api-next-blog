import { BadRequest } from '@shared/errors';
import { IDeleteTag } from '../domain/model/IDeleteTag';
import { inject, injectable } from 'tsyringe';
import { ITagsRepository } from '../domain/repositories/ITagsRepository';

@injectable()
export class DeleteTagService {
  constructor(
    @inject('TagsRepository')
    private tagsRepository: ITagsRepository
  ) { }

  async execute({ id }: IDeleteTag) {
    // Verify if the tag exists
    const tagExists = await this.tagsRepository.findById(id);
    if (!tagExists) throw new BadRequest('tag_not_found_error');

    await this.tagsRepository.delete({ id });

    return { deleted: true };
  }
}
