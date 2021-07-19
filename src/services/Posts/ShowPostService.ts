import { getCustomRepository } from 'typeorm';
import { BadRequest } from '../../custom/errors';
import { IShowPostRequestDTO } from '../../DTOs/IShowPostRequestDTO';
import { PostsRepositories } from '../../repositories';

export class ShowPostService {
  async execute({ slug }: IShowPostRequestDTO) {
    const postsRepositories = getCustomRepository(PostsRepositories);
    const post = await postsRepositories.findOne({
      where: { slug: slug },
      relations: ['cover', 'author', 'category'],
    });

    if (!post) throw new BadRequest('Post not found');

    return post;
  }
}
