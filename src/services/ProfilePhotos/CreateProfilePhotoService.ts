import { getCustomRepository } from 'typeorm';
import { ICreateProfilePhotoRequestDTO } from '../../DTOs/ICreateProfilePhotoRequestDTO';
import { ProfilePhotosRepositories } from '../../repositories';

export class CreateProfilePhotoService {
  async execute({ url }: ICreateProfilePhotoRequestDTO) {
    const profilePhotosRepositories = getCustomRepository(ProfilePhotosRepositories);

    const profilePhoto = profilePhotosRepositories.create({ url });
    await profilePhotosRepositories.save(profilePhoto);

    return profilePhoto;
  }
}
