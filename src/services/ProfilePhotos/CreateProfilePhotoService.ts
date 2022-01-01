import { getCustomRepository } from 'typeorm';
import { BadRequest } from '../../shared/errors';
import { ICreateProfilePhotoRequestDTO } from '../../DTOs/ICreateProfilePhotoRequestDTO';
import { uploadToCloudinary } from '../../provider';
import { AuthorsRepositories, ProfilePhotosRepositories } from '../../repositories';

export class CreateProfilePhotoService {
  async execute({ userId, file }: ICreateProfilePhotoRequestDTO) {
    const profilePhotosRepositories = getCustomRepository(ProfilePhotosRepositories);
    const authorsRepositories = getCustomRepository(AuthorsRepositories);

    const author = await authorsRepositories.findOneWithPhoto(userId);
    if (!author) throw new BadRequest('user_not_found_error');

    const { url } = await uploadToCloudinary(file);

    const profilePhoto = profilePhotosRepositories.create({ url });
    await profilePhotosRepositories.save(profilePhoto);

    await authorsRepositories.update(userId, { profilePhoto });

    return profilePhoto;
  }
}
