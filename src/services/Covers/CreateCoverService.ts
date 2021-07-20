import { getCustomRepository } from 'typeorm';
import { ICreateCoversRequestDTO } from '../../DTOs/ICreateCoversRequestDTO';
import { FormatsRepositories } from '../../repositories';
import { CoversRepositories } from '../../repositories/CoversRepositories';

export class CreateCoverService {
  async execute({ name, publicId, width, height, url, formatId, provider }: ICreateCoversRequestDTO) {
    const coversRepositories = getCustomRepository(CoversRepositories);
    const formatsRepositories = getCustomRepository(FormatsRepositories);

    const format = await formatsRepositories.findOne({ id: formatId });

    const cover = coversRepositories.create({ name, publicId, width, height, url, provider, format });

    await coversRepositories.save(cover);

    return cover;
  }
}
