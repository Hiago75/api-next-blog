import { getCustomRepository } from 'typeorm';
import { ICreatePostsRequestDTO } from '../../DTOs/ICreatePostsRequestDTO';
import { AuthorsRepositories } from '../../repositories/AuthorsRepositories';
import { CategoriesRepositories } from '../../repositories/CategoriesRepositories';
import { CoversRepositories } from '../../repositories/CoversRepositories';
import { PostsRepositories } from '../../repositories/PostsRepositories';

export class CreatePostsService {
  // TODO: Refactor

  async execute({ title, content, slug, categoryId, authorId, coverId }: ICreatePostsRequestDTO) {
    const postsRepositories = getCustomRepository(PostsRepositories);
    const categoriesRepositories = getCustomRepository(CategoriesRepositories);
    const authorsRepositories = getCustomRepository(AuthorsRepositories);
    const coversRepositories = getCustomRepository(CoversRepositories);

    const post = postsRepositories.create({
      title,
      content,
      slug,
    });

    const category = await categoriesRepositories.findOne({ id: categoryId });
    const author = await authorsRepositories.findOne({ id: authorId });
    const cover = await coversRepositories.findOne({ id: coverId });

    if (category) post.category = category;
    if (author) post.author = author;
    if (cover) post.cover = cover;

    await postsRepositories.save(post);

    return post;
  }
}
