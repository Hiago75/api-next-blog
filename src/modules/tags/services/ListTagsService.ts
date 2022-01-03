import { inject, injectable } from 'tsyringe';
import { ITagsRepository } from '../domain/repositories/ITagsRepository';

@injectable()
export class ListTagsService {
  constructor(
    @inject('TagsRepository')
    private tagsRepository: ITagsRepository
  ) { }

  async execute() {
    const tags = await this.tagsRepository.findAll();

    return tags;
  }
}
