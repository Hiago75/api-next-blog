import { container } from 'tsyringe';

import { ITagsRepository } from '@modules/tags/domain/repositories/ITagsRepository';
import { TagsRepository } from '@modules/tags/infra/typeorm/repositories/TagsRepository';

container.registerSingleton<ITagsRepository>(
  'TagsRepository',
  TagsRepository
)
