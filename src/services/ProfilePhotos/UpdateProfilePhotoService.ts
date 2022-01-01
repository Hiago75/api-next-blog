import { getCustomRepository } from 'typeorm';
import { BadRequest } from '../../shared/errors';
import { IUpdateProfilePhotoRequestDTO } from '../../DTOs/IUpdateProfilePhotoRequestDTO';
import { uploadToCloudinary } from '../../provider';
import { AuthorsRepositories, ProfilePhotosRepositories } from '../../repositories';

export class UpdateProfilePhotoService {
  async execute({ userId, file }: IUpdateProfilePhotoRequestDTO) {
    const profilePhotoRepositories = getCustomRepository(ProfilePhotosRepositories);
    const authorsRepositories = getCustomRepository(AuthorsRepositories);

    const author = await authorsRepositories.findOneWithPhoto(userId);
    if (!author) throw new BadRequest('user_not_found_error');

    const { profilePhoto } = author;
    if (!profilePhoto) throw new BadRequest('profile_photo_not_found_error');

    // Update the profile photo
    const { url } = await uploadToCloudinary(file);
    await profilePhotoRepositories.update(profilePhoto.id, { url });

    const updatedPhoto = await profilePhotoRepositories.findOne(profilePhoto.id);
    if (!updatedPhoto) throw new BadRequest('profile_photo_not_found_error');

    return updatedPhoto;
  }
}
