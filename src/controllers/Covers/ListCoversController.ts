import { Request, Response } from 'express';
import { ListCoversService } from '../../services/Covers/ListCoversService';

export class ListCoversController {
  constructor(private listCoversService: ListCoversService) {}
  async handle(_request: Request, response: Response) {
    const covers = await this.listCoversService.execute();

    return response.json(covers);
  }
}
