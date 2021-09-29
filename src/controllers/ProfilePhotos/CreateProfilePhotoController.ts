import fs from 'fs';
import { Request, Response } from 'express';

import { BadRequest } from '../../custom/errors';
import { CreateProfilePhotoService } from '../../services/ProfilePhotos/CreateProfilePhotoService';

export class CreateProfilePhotoController {
  constructor(private createProfilePhotoService: CreateProfilePhotoService) {}

  async handle(req: Request, res: Response) {
    const userId = req.user_id;
    const file = req.file ? req.file.path : '';

    if (!file) throw new BadRequest('profile_photo_creation_photo_missing');

    const { id } = await this.createProfilePhotoService.execute({ userId, file });

    fs.unlink(file, () => {
      return res.json({ profilePhoto: id });
    });
  }
}
