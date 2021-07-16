import { Request, Response } from 'express';
import { CreateCoverService } from '../../services';
import { cloudinary } from '../../config/cloudinary';

export class CreateCoversController {
  constructor(private createCoversService: CreateCoverService) {}

  async handle(request: Request, response: Response) {
    const {
      original_filename: name,
      public_id: publicId,
      width,
      height,
      secure_url: url,
    } = await cloudinary.uploader.upload(request.file ? request.file.path : '');

    const cover = await this.createCoversService.execute({
      name,
      publicId,
      width,
      height,
      url,
      provider: 'cloudinary',
    });

    return cover;
  }
}
