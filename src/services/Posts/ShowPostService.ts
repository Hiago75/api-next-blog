import { getCustomRepository } from 'typeorm';
import { BadRequest } from '../../custom/errors';
import { IShowPostRequestDTO } from '../../DTOs/IShowPostRequestDTO';
import { PostsRepositories } from '../../repositories';

export class ShowPostService {
  async execute({ slug }: IShowPostRequestDTO) {
    const postsRepositories = getCustomRepository(PostsRepositories);
    const post = await postsRepositories.findOne({
      where: { slug: slug },
      relations: [
        'cover',
        'cover.format',
        'cover.format.large',
        'cover.format.medium',
        'cover.format.small',
        'cover.format.thumbnail',
        'author',
        'category',
      ],
    });

    if (!post) throw new BadRequest('Post not found');

    return post;
  }
}
