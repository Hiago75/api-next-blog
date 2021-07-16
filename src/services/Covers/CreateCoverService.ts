import { getCustomRepository } from 'typeorm';
import { ICreateCoversRequestDTO } from '../../DTOs/ICreateCoversRequestDTO';
import { CoversRepositories } from '../../repositories/CoversRepositories';

export class CreateCoverService {
  async execute({ name, publicId, width, height, url, provider }: ICreateCoversRequestDTO) {
    const coversRepositories = getCustomRepository(CoversRepositories);
    console.log(name, publicId, width, height, url, provider);

    const cover = coversRepositories.create({ name, publicId, width, height, url, provider });
    await coversRepositories.save(cover);

    return cover;
  }
}
