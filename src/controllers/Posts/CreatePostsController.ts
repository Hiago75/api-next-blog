import { Request, Response } from 'express';
import slugify from 'slugify';
import { getCustomRepository } from 'typeorm';
import { BadRequest } from '../../custom/errors';
import { PostsRepositories } from '../../repositories/PostsRepositories';

import { CreatePostsService } from '../../services/Posts/CreatePostsService';

export class CreatePostsController {
  constructor(private createPostsService: CreatePostsService) {}

  async handle(request: Request, response: Response) {
    const { title, content, categoryId, authorId, coverId } = request.body;
    const postsRepositories = getCustomRepository(PostsRepositories);
    const titleUsed = await postsRepositories.findOne({ title: title });

    if (titleUsed) {
      throw new BadRequest('That title has already been used');
    }

    const slug = slugify(title);

    const post = await this.createPostsService.execute({
      title,
      content,
      slug,
      categoryId,
      authorId,
      coverId,
    });

    return response.json(post);
  }
}
