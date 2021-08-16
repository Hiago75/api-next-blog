import { Request, Response } from 'express';
import { BadRequest } from '../../custom/errors';
import { uploadToCloudinary } from '../../provider';
import { CreateProfilePhotoService } from '../../services/ProfilePhotos/CreateProfilePhotoService';
import fs from 'fs';

export class CreateProfilePhotoController {
  constructor(private createProfilePhotoService: CreateProfilePhotoService) {}

  async handle(req: Request, res: Response) {
    // TODO: remove the necessety of the userID
    const userId = req.user_id;
    const file = req.file ? req.file.path : '';

    if (!file) throw new BadRequest('profile_photo_creation_photo_missing');

    const { url } = await uploadToCloudinary(file);

    const { id } = await this.createProfilePhotoService.execute({ url, userId });

    fs.unlink(file, () => {
      return res.json({ profilePhoto: id });
    });
  }
}
