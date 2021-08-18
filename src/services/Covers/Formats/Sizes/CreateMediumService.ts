import { getCustomRepository } from 'typeorm';
import { ICreateSizeRequestDTO } from '../../../../DTOs/ICreateSizeRequestDTO';
import { MediumRepositories } from '../../../../repositories/MediumRepositories';

export class CreateMediumService {
  async execute({ width, height, url }: ICreateSizeRequestDTO) {
    const mediumRepositories = getCustomRepository(MediumRepositories);

    const medium = mediumRepositories.create({
      width,
      height,
      url,
    });

    await mediumRepositories.save(medium);

    return medium;
  }
}
