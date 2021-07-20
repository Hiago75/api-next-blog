import { CreateFormatService } from '../../services/Formats/CreateFormatService';
import { CreateLargeController } from './Sizes/CreateLargeController';
import { CreateMediumController } from './Sizes/CreateMediumController';
import { CreateSmallController } from './Sizes/CreateSmallController';
import { CreateThumbnailController } from './Sizes/CreateThumbnailController';

type ICreateFormatRequest = {
  transformation: string;
  width: number;
  height: number;
  bytes: number;
  format: string;
  url: string;
  secure_url: string;
};

export class CreateFormatController {
  constructor(
    private createLargeController: CreateLargeController,
    private createMediumController: CreateMediumController,
    private createSmallController: CreateSmallController,
    private createThumbnailController: CreateThumbnailController,
    private createFormatService: CreateFormatService,
  ) {}

  async handle(data: ICreateFormatRequest[]) {
    const largeId = (await this.createLargeController.handle(data[0])).id;
    const mediumId = (await this.createMediumController.handle(data[1])).id;
    const smallId = (await this.createSmallController.handle(data[2])).id;
    const thumbnailId = (await this.createThumbnailController.handle(data[3])).id;

    const formats = await this.createFormatService.execute({
      largeId,
      mediumId,
      smallId,
      thumbnailId,
    });

    return formats;
  }
}
