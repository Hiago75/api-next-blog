import { getCustomRepository } from 'typeorm';
import { ICreateSizeRequestDTO } from '../../../DTOs/ICreateSizeRequestDTO';
import { ThumbnailRepositories } from '../../../repositories';

export class CreateThumbnailService {
  async execute({ width, height, url }: ICreateSizeRequestDTO) {
    const thumbnailRepositories = getCustomRepository(ThumbnailRepositories);

    const thumbnail = thumbnailRepositories.create({
      width,
      height,
      url,
    });

    await thumbnailRepositories.save(thumbnail);

    return thumbnail;
  }
}
