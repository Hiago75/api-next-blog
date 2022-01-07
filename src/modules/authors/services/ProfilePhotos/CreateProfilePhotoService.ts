import { injectable, inject } from 'tsyringe';
import { BadRequest } from '@shared/errors';
import { uploadToCloudinary } from '../../../../provider';
import { IAuthorsRepository } from '@modules/authors/domain/repositories/IAuthorsRepository';
import { ICreateProfilePhoto } from '@modules/authors/domain/model/ProfilePhotos/ICreateProfilePhoto';
import { IProfilePhotosRepository } from '@modules/authors/domain/repositories/IProfilePhotosRepository';

@injectable()
export class CreateProfilePhotoService {
  constructor(
    @inject('AuthorsRepository')
    private authorsRepository: IAuthorsRepository,
    @inject('ProfilePhotosRepository')
    private profilePhotosRepository: IProfilePhotosRepository
  ) { }

  async execute({ user_id, photoFile }: ICreateProfilePhoto) {
    const author = await this.authorsRepository.findById(user_id);
    if (!author) throw new BadRequest('user_not_found_error');

    const { url } = await uploadToCloudinary(photoFile);

    const photo = await this.profilePhotosRepository.create(url);

    const authorWithPhoto = await this.authorsRepository.createAuthorsProfilePhoto({ user_id, photo });

    return authorWithPhoto;
  }
}
