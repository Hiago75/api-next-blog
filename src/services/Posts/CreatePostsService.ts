import { getCustomRepository } from 'typeorm';
import { BadRequest } from '../../custom/errors';
import { ICreatePostsRequestDTO } from '../../DTOs/ICreatePostsRequestDTO';
import { AuthorsRepositories, CategoriesRepositories, CoversRepositories, PostsRepositories } from '../../repositories';
import { TagsRepositories } from '../../repositories/TagsRepositories';

export class CreatePostsService {
  async execute({ title, content, slug, tagIds, categoryId, authorId, coverId }: ICreatePostsRequestDTO) {
    // Repositories
    const postsRepositories = getCustomRepository(PostsRepositories);
    const categoriesRepositories = getCustomRepository(CategoriesRepositories);
    const authorsRepositories = getCustomRepository(AuthorsRepositories);
    const coversRepositories = getCustomRepository(CoversRepositories);
    const tagsRepositories = getCustomRepository(TagsRepositories);

    // Verify if the title has already been used by another post
    const titleUsed = await postsRepositories.findOne({ title: title });
    if (titleUsed) throw new BadRequest('post_creation_title_in_use');

    // Verify if something sent doesn't exists
    const category = await categoriesRepositories.findOne({ id: categoryId });
    if (!category) throw new BadRequest('category_not_found_error');

    const cover = await coversRepositories.findOne({ id: coverId });
    if (!cover) throw new BadRequest('cover_not_found_error');

    const author = await authorsRepositories.findOne({ id: authorId });

    // Get the tags on the repository
    const tags = await Promise.all(
      tagIds.map(async (tagId) => {
        const foundTag = await tagsRepositories.findOne(tagId);
        if (!foundTag) throw new BadRequest('Tag not found');

        return foundTag;
      }),
    );

    const post = postsRepositories.create({
      title,
      content,
      slug,
      tags,
      category,
      author,
      cover,
    });

    await postsRepositories.save(post);

    return post;
  }
}
