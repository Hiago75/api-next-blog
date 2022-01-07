import fs from 'fs';
import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { CreateProfilePhotoService } from '@modules/authors/services/ProfilePhotos/CreateProfilePhotoService';
import { UpdateProfilePhotoService } from '@modules/authors/services/ProfilePhotos/UpdateProfilePhotoService';

class ProfilePhotosController {
  public async create(request: Request, response: Response): Promise<void> {
    const { user_id } = request;
    const photo = request.file ? request.file.path : '';
    const createProfilePhoto = container.resolve(CreateProfilePhotoService);

    const profilePhoto = await createProfilePhoto.execute({ user_id, photo });

    fs.unlink(photo, () => {
      return response.json(profilePhoto);
    })
  }

  public async update(request: Request, response: Response): Promise<void> {
    const { user_id } = request;
    const photo = request.file ? request.file.path : '';
    const updateProfilePhoto = container.resolve(UpdateProfilePhotoService);

    const profilePhoto = await updateProfilePhoto.execute({ user_id, photo });

    fs.unlink(photo, () => {
      return response.json(profilePhoto);
    })
  }
}

export default ProfilePhotosController
