import { container } from 'tsyringe';

import { ITagsRepository } from '@modules/tags/domain/repositories/ITagsRepository';
import { TagsRepository } from '@modules/tags/infra/typeorm/repositories/TagsRepository';
import { IAuthorsRepository } from '@modules/authors/domain/repositories/IAuthorsRepository';
import { AuthorsRepository } from '@modules/authors/infra/typeorm/repositories/AuthorsRepository';
import { IProfilePhotosRepository } from '@modules/authors/domain/repositories/IProfilePhotosRepository';
import { ProfilePhotosRepositories } from '@modules/authors/infra/typeorm/repositories/ProfilePhotosRepository';

import '@modules/authors/providers';
import { IRefreshTokenRepository } from '@modules/authors/domain/repositories/IRefreshTokenRepository';
import { RefreshTokensRepository } from '@modules/authors/infra/typeorm/repositories/RefreshTokensRepository';


container.registerSingleton<ITagsRepository>(
  'TagsRepository',
  TagsRepository
)

container.registerSingleton<IAuthorsRepository>(
  'AuthorsRepository',
  AuthorsRepository
)

container.registerSingleton<IProfilePhotosRepository>(
  'ProfilePhotosRepository',
  ProfilePhotosRepositories
)

container.registerSingleton<IRefreshTokenRepository>(
  'RefreshTokensRepository',
  RefreshTokensRepository
)
