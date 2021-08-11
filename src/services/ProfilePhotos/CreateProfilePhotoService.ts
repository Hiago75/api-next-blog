import { getCustomRepository } from 'typeorm';
import { BadRequest } from '../../custom/errors';
import { ICreateProfilePhotoRequestDTO } from '../../DTOs/ICreateProfilePhotoRequestDTO';
import { AuthorsRepositories, ProfilePhotosRepositories } from '../../repositories';

export class CreateProfilePhotoService {
  async execute({ url, userId }: ICreateProfilePhotoRequestDTO) {
    const authorsRepositories = getCustomRepository(AuthorsRepositories);
    const profilePhotosRepositories = getCustomRepository(ProfilePhotosRepositories);

    const user = await authorsRepositories.findOne(userId);
    if (!user) throw new BadRequest('user_not_found_error');

    const profilePhoto = profilePhotosRepositories.create({ url, user });
    await profilePhotosRepositories.save(profilePhoto);

    return profilePhoto;
  }
}
