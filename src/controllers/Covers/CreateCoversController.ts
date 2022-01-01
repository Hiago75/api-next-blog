import fs from 'fs';
import { Request, Response } from 'express';

import { BadRequest } from '../../shared/errors';
import { uploadToCloudinary } from '../../provider/';
import { CreateCoverService } from '../../services';

import { CreateFormatController } from './Formats/CreateFormatController';

export class CreateCoversController {
  constructor(
    private createCoversService: CreateCoverService,
    private createFormatsController: CreateFormatController,
  ) { }

  async handle(request: Request, response: Response) {
    const file = request.file ? request.file.path : '';

    if (!file) throw new BadRequest('You need to send a photo');

    const formats = [{ width: 1280 }, { width: 1000 }, { width: 750 }, { width: 500 }];

    const { name, publicId, width, height, url, eager } = await uploadToCloudinary(file, formats);

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

    fs.unlink(file, () => {
      return response.json(cover);
    });
  }
}
