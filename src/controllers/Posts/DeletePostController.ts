import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import { BadRequest } from '../../custom/errors';
import { PostsRepositories } from '../../repositories';
import { DeletePostService } from '../../services/Posts/DeletePostService';

export class DeletePostController {
  constructor(private deletePostService: DeletePostService) {}

  async handle(request: Request, response: Response) {
    const { postId } = request.body;
    const categoriesRepositories = getCustomRepository(PostsRepositories);

    const postExists = await categoriesRepositories.findOne({ id: postId });

    if (!postId) throw new BadRequest('Post ID is obligatory');
    if (!postExists) throw new BadRequest('Post not found');

    await this.deletePostService.execute({ postId });

    return response.status(200).json({
      deleted: true,
    });
  }
}
