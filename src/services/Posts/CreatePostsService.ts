import { getCustomRepository } from 'typeorm';
import { ICreatePostsRequestDTO } from '../../DTOs/ICreatePostsRequestDTO';
import { AuthorsRepositories, CategoriesRepositories, CoversRepositories, PostsRepositories } from '../../repositories';
export class CreatePostsService {
  async execute({ title, content, slug, categoryId, authorId, coverId }: ICreatePostsRequestDTO) {
    const postsRepositories = getCustomRepository(PostsRepositories);
    const categoriesRepositories = getCustomRepository(CategoriesRepositories);
    const authorsRepositories = getCustomRepository(AuthorsRepositories);
    const coversRepositories = getCustomRepository(CoversRepositories);

    const category = await categoriesRepositories.findOne({ id: categoryId });
    const author = await authorsRepositories.findOne({ id: authorId });
    const cover = await coversRepositories.findOne({ id: coverId });

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
