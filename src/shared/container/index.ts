import { container } from 'tsyringe';

import { ITagsRepository } from '@modules/tags/domain/repositories/ITagsRepository';
import { TagsRepository } from '@modules/tags/infra/typeorm/repositories/TagsRepository';
import { IAuthorsRepository } from '@modules/authors/domain/repositories/IAuthorsRepository';
import { AuthorsRepository } from '@modules/authors/infra/typeorm/repositories/AuthorsRepository';

import '@modules/authors/providers';

container.registerSingleton<ITagsRepository>(
  'TagsRepository',
  TagsRepository
)

container.registerSingleton<IAuthorsRepository>(
  'AuthorsRepository',
  AuthorsRepository
)
