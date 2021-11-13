import { Request, Response } from 'express';
import slugify from 'slugify';
import axios from 'axios';

import { BadRequest } from '../../custom/errors';

import { CreatePostsService } from '../../services/Posts/CreatePostsService';

export class CreatePostsController {
  // eslint-disable-next-line prettier/prettier
  constructor(private createPostsService: CreatePostsService) { }

  async handle(request: Request, response: Response) {
    const authorId = request.user_id;
    const { title, content, photoUrl, categoryId, coverId, tagIds } = request.body;

    // Verify if something is missing
    if (!title) throw new BadRequest('post_creation_title_missing_error');
    if (!content) throw new BadRequest('post_creation_content_missing_error');
    if (!categoryId) throw new BadRequest('post_creation_categoryId_missing_error');
    if (!coverId && !photoUrl) throw new BadRequest('post_coverId_title_missing_error');
    if (!tagIds || tagIds?.length < 1) throw new BadRequest('You need to send one tag at least ');

    // Use the title to create the slug
    const slug = slugify(title);

    // Create the post
    const post = await this.createPostsService.execute({
      title,
      content,
      slug,
      photoUrl,
      tagIds,
      categoryId,
      authorId,
      coverId,
    });

    if (process.env.NODE_ENV === 'production')
      axios.post('https://api.netlify.com/build_hooks/61675fa4f2f8f62777bca770');

    return response.json(post);
  }
}
