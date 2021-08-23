import fs from 'fs';
import { Request, Response } from 'express';
import { BadRequest } from '../../custom/errors';
import { UpdateProfilePhotoService } from '../../services/ProfilePhotos/UpdateProfilePhotoService';

export class UpdateProfilePhotoController {
  constructor(private updateProfilePhotoService: UpdateProfilePhotoService) {}

  async handle(req: Request, res: Response) {
    const userId = req.user_id;
    const file = req.file ? req.file.path : '';

    if (!file) throw new BadRequest('profile_photo_creation_photo_missing');

    const profilePhoto = await this.updateProfilePhotoService.execute({ userId, file });

    fs.unlink(file, () => {
      return res.json(profilePhoto);
    });
  }
}
