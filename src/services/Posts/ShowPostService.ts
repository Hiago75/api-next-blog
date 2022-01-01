import { getCustomRepository } from 'typeorm';
import { BadRequest } from '../../shared/errors';
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
        'tags',
        'author',
        'category',
      ],
    });

    if (!post) throw new BadRequest('post_not_found_error');

    return post;
  }
}
