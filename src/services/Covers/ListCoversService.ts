import { getCustomRepository } from 'typeorm';
import { CoversRepositories } from '../../repositories/CoversRepositories';

export class ListCoversService {
  async execute() {
    const coversRepositories = getCustomRepository(CoversRepositories);

    try {
      const covers = await coversRepositories.find({
        relations: ['format', 'format.large', 'format.medium', 'format.small', 'format.thumbnail'],
      });
      return covers;
    } catch (e) {
      console.log(e);
    }
  }
}
