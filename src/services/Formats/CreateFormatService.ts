import { getCustomRepository } from 'typeorm';
import { ICreateFormatRequestDTO } from '../../DTOs/ICreateFormatRequestDTO';
import { LargeRepositories, MediumRepositories, SmallRepositories, ThumbnailRepositories } from '../../repositories';
import { FormatsRepositories } from '../../repositories/FormatsRepositories';

export class CreateFormatService {
  async execute({ largeId, mediumId, smallId, thumbnailId }: ICreateFormatRequestDTO) {
    const formatsRepositories = getCustomRepository(FormatsRepositories);
    const largeRepositories = getCustomRepository(LargeRepositories);
    const mediumRepositories = getCustomRepository(MediumRepositories);
    const smallRepositories = getCustomRepository(SmallRepositories);
    const thumbnailRepositories = getCustomRepository(ThumbnailRepositories);

    const large = await largeRepositories.findOne({ id: largeId });
    const medium = await mediumRepositories.findOne({ id: mediumId });
    const small = await smallRepositories.findOne({ id: smallId });
    const thumbnail = await thumbnailRepositories.findOne({ id: thumbnailId });

    const format = formatsRepositories.create({
      large,
      medium,
      small,
      thumbnail,
    });

    formatsRepositories.save(format);

    return format;
  }
}
