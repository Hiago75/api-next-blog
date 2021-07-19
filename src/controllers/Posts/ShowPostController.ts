import { Request, Response } from 'express';
import { ShowPostService } from '../../services/Posts/ShowPostService';

export class ShowPostController {
  constructor(private showPostService: ShowPostService) {}

  async handle(request: Request, response: Response) {
    const { slug } = request.params;

    const post = await this.showPostService.execute({ slug });

    return response.json(post);
  }
}
