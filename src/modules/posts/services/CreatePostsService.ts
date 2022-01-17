import { inject, injectable } from 'tsyringe';
import { BadRequest } from '@shared/errors';
import { IPostsRepository } from '../domain/repositories/IPostsRepository';
import { ICategoriesRepository } from '../domain/repositories/ICategoriesRepository';
import { IAuthorsRepository } from '@modules/authors/domain/repositories/IAuthorsRepository';
import { ICoversRepository } from '../domain/repositories/ICoversRepository';
import { ITagsRepository } from '@modules/tags/domain/repositories/ITagsRepository';
import { ICreatePost } from '../domain/model/ICreatePost';

@injectable()
export class CreatePostsService {
  constructor(
    @inject('PostsRepository')
    private postsRepository: IPostsRepository,
    @inject('CategoriesRepository')
    private categoriesRepository: ICategoriesRepository,
    @inject('AuthorsRepository')
    private authorsRepository: IAuthorsRepository,
    @inject('CoversRepository')
    private coversRepository: ICoversRepository,
    @inject('TagsRepository')
    private tagsRepository: ITagsRepository,
  ) { }

  async execute({ title, content, slug, tagIds, categoryId, authorId, coverId, photoUrl }: ICreatePost) {
    // Refator
    const titleUsed = await this.postsRepository.findByTitle(title);
    if (titleUsed) throw new BadRequest('post_creation_title_in_use');

    const category = await this.categoriesRepository.findById(categoryId);
    if (!category) throw new BadRequest('category_not_found_error');

    // const cover = await this.coversRepository.findById(coverId);

    // const author = await this.authorsRepository.findById(authorId);

    // const tags = await Promise.all(
    //   tagIds.map(async (tagId: string) => {
    //     const foundTag = await this.tagsRepository.findById(tagId);
    //     if (!foundTag) throw new BadRequest('Tag not found');

    //     return foundTag;
    //   }),
    // );

    // const postProperties = { title, content, slug, tags, categoryId, author, coverId };
    // const filteredCover = coverId ? { cover } : { externalPhotoUrl: photoUrl };

    const post = 'something'

    return post;
  }
}
