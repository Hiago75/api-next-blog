import { Request, Response } from 'express';
import { CreateCoverService } from '../../services';
import { cloudinary } from '../../config/cloudinary';
import { CreateFormatController } from '../Formats/CreateFormatController';

export class CreateCoversController {
  constructor(
    private createCoversService: CreateCoverService,
    private createFormatsController: CreateFormatController,
  ) {}

  async handle(request: Request, response: Response) {
    const {
      original_filename: name,
      public_id: publicId,
      width,
      height,
      secure_url: url,
      eager,
    } = await cloudinary.uploader.upload(request.file ? request.file.path : '', {
      eager: [{ width: 1280 }, { width: 1000 }, { width: 750 }, { width: 500 }],
    });

    const { id: formatId } = await this.createFormatsController.handle(eager);

    const cover = await this.createCoversService.execute({
      name,
      publicId,
      width,
      height,
      url,
      formatId,
      provider: 'cloudinary',
    });

    return response.json(cover);
  }
}
