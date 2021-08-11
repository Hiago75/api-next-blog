import { Request, Response } from 'express';
import { BadRequest } from '../../custom/errors';
import { uploadToCloudinary } from '../../provider';
import { CreateProfilePhotoService } from '../../services/ProfilePhotos/CreateProfilePhotoService';

export class CreateProfilePhotoController {
  constructor(private createProfilePhotoService: CreateProfilePhotoService) {}

  async handle(req: Request, res: Response) {
    const userId = req.user_id;
    const file = req.file ? req.file.path : '';

    if (!file) throw new BadRequest('You need to send a photo');

    const { url } = await uploadToCloudinary(file);

    const { id } = await this.createProfilePhotoService.execute({ url, userId });

    return res.json({ profilePhoto: id });
  }
}