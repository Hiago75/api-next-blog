import { getCustomRepository } from 'typeorm';
import { BadRequest } from '../../custom/errors';
import { ICreatePostsRequestDTO } from '../../DTOs/ICreatePostsRequestDTO';
import { AuthorsRepositories, CategoriesRepositories, CoversRepositories, PostsRepositories } from '../../repositories';

export class CreatePostsService {
  async execute({ title, content, slug, categoryId, authorId, coverId }: ICreatePostsRequestDTO) {
    const postsRepositories = getCustomRepository(PostsRepositories);
    const categoriesRepositories = getCustomRepository(CategoriesRepositories);
    const authorsRepositories = getCustomRepository(AuthorsRepositories);
    const coversRepositories = getCustomRepository(CoversRepositories);

    const category = await categoriesRepositories.findOne({ id: categoryId });
    if (!category) throw new BadRequest('category_not_found_error');

    const cover = await coversRepositories.findOne({ id: coverId });
    if (!cover) throw new BadRequest('cover_not_found_error');

    const author = await authorsRepositories.findOne({ id: authorId });

    const titleUsed = await postsRepositories.findOne({ title: title });
    if (titleUsed) throw new BadRequest('post_creation_title_in_use');

    const post = postsRepositories.create({
      title,
      content,
      slug,
      category,
      author,
      cover,
    });

    await postsRepositories.save(post);

    return post;
  }
}
