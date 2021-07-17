import { getCustomRepository } from 'typeorm';
import { CoversRepositories } from '../../repositories/CoversRepositories';

export class ListCoversService {
  async execute() {
    const coversRepositories = getCustomRepository(CoversRepositories);

    const covers = await coversRepositories.find();

    return covers;
  }
}
