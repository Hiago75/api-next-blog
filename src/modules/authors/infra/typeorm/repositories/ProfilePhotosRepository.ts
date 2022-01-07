import { IProfilePhoto } from '@modules/authors/domain/model/ProfilePhotos/IProfilePhoto';
import { IProfilePhotosRepository } from '@modules/authors/domain/repositories/IProfilePhotosRepository';
import { getRepository, Repository } from 'typeorm';
import { ProfilePhoto } from '@modules/authors/infra/typeorm/entities/ProfilePhoto';

export class ProfilePhotosRepositories implements IProfilePhotosRepository {
  private ormRepository: Repository<IProfilePhoto>;

  constructor() {
    this.ormRepository = getRepository(ProfilePhoto);
  }

  async create(url: string): Promise<IProfilePhoto> {
    const profilePhoto = this.ormRepository.create({ url });

    await this.ormRepository.save(profilePhoto);

    return profilePhoto;
  }

  async updateUrl(profilePhoto: IProfilePhoto, newUrl: string): Promise<IProfilePhoto> {
    profilePhoto.url = newUrl;

    await this.ormRepository.save(profilePhoto);

    return profilePhoto
  }

}
