import { Request, Response } from 'express';
import { CountPostsService } from '../../services';

export class CountPostsController {
  constructor(private countPostsService: CountPostsService) {}

  async handle(_request: Request, response: Response) {
    // TODO: retornar o total de posts e o numero de posts por usuário
    const numOfPosts = await this.countPostsService.execute();

    return response.json(numOfPosts);
  }
}
