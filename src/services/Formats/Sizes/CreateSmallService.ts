import { getCustomRepository } from 'typeorm';
import { ICreateSizeRequestDTO } from '../../../DTOs/ICreateSizeRequestDTO';
import { SmallRepositories } from '../../../repositories';

export class CreateSmallService {
  async execute({ width, height, url }: ICreateSizeRequestDTO) {
    const smallRepositories = getCustomRepository(SmallRepositories);

    const small = smallRepositories.create({
      width,
      height,
      url,
    });

    await smallRepositories.save(small);

    return small;
  }
}
