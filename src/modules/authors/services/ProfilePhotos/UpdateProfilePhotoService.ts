import { inject, injectable } from 'tsyringe';
import { BadRequest } from '@shared/errors';
import { IUpdateProfilePhoto } from '@modules/authors/domain/model/ProfilePhotos/IUpdateProfilePhoto';
import { IProfilePhotosRepository } from '@modules/authors/domain/repositories/IProfilePhotosRepository';
import { IAuthorsRepository } from '@modules/authors/domain/repositories/IAuthorsRepository';
import { ICdnProvider } from '@modules/authors/providers/ImageProvider/models/ICdnProvider';

@injectable()
export class UpdateProfilePhotoService {
  constructor(
    @inject('AuthorsRepository')
    private authorsRepository: IAuthorsRepository,
    @inject('ProfilePhotosRepository')
    private profilePhotosRepository: IProfilePhotosRepository,
    @inject('CdnProvider')
    private cdnProvider: ICdnProvider
  ) { }

  async execute({ user_id, photo }: IUpdateProfilePhoto) {
    const author = await this.authorsRepository.findById(user_id);
    if (!author) throw new BadRequest('user_not_found_error');

    const { profilePhoto } = author;
    if (!profilePhoto) throw new BadRequest('profile_photo_not_found_error');

    // Update the profile photo
    const { url } = await this.cdnProvider.uploadImage(photo);
    const updatedPhoto = await this.profilePhotosRepository.updateUrl(profilePhoto, url);

    return updatedPhoto;
  }
}
