import { getCustomRepository } from 'typeorm';
import { BadRequest } from '../../shared/errors';
import { ICreatePostsRequestDTO } from '../../DTOs/ICreatePostsRequestDTO';
import { AuthorsRepositories, CategoriesRepositories, CoversRepositories, PostsRepositories } from '../../repositories';
import { TagsRepository } from '@modules/tags/infra/typeorm/repositories/TagsRepository';
export class CreatePostsService {
  async execute({ title, content, slug, tagIds, categoryId, authorId, coverId, photoUrl }: ICreatePostsRequestDTO) {
    // Repositories
    const postsRepositories = getCustomRepository(PostsRepositories);
    const categoriesRepositories = getCustomRepository(CategoriesRepositories);
    const authorsRepositories = getCustomRepository(AuthorsRepositories);
    const coversRepositories = getCustomRepository(CoversRepositories);
    const tagsRepositories = getCustomRepository(TagsRepository);

    try {
      // Verify if the title has already been used by another post
      const titleUsed = await postsRepositories.findOne({ title: title });
      if (titleUsed) throw new BadRequest('post_creation_title_in_use');

      // Verify if something sent doesn't exists
      const category = await categoriesRepositories.findOne({ id: categoryId });
      if (!category) throw new BadRequest('category_not_found_error');

      const cover = await coversRepositories.findOne({ id: coverId });
      // if (!cover) throw new BadRequest('cover_not_found_error');

      const author = await authorsRepositories.findOne({ id: authorId });

      // Get the tags on the repository
      const tags = await Promise.all(
        tagIds.map(async (tagId) => {
          const foundTag = await tagsRepositories.findById(tagId);
          if (!foundTag) throw new BadRequest('Tag not found');

          return foundTag;
        }),
      );

      const postProperties = { title, content, slug, tags, categoryId, author, coverId };
      const filteredCover = coverId ? { cover } : { externalPhotoUrl: photoUrl };

      const post = postsRepositories.create({ ...postProperties, ...filteredCover });

      await postsRepositories.save(post);

      return post;
    } catch (e) {
      console.log(e);
    }
  }
}
