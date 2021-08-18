import { getCustomRepository } from 'typeorm';
import { ICreateSizeRequestDTO } from '../../../../DTOs/ICreateSizeRequestDTO';
import { LargeRepositories } from '../../../../repositories/LargeRepositories';

export class CreateLargeService {
  async execute({ width, height, url }: ICreateSizeRequestDTO) {
    const largeRepositories = getCustomRepository(LargeRepositories);

    const large = largeRepositories.create({
      width,
      height,
      url,
    });

    await largeRepositories.save(large);

    return large;
  }
}
