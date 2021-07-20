import { CreateThumbnailService } from '../../../services/Formats/Sizes/CreateThumbnailService';

type ICreateThumbnailRequest = {
  transformation: string;
  width: number;
  height: number;
  bytes: number;
  format: string;
  url: string;
  secure_url: string;
};
export class CreateThumbnailController {
  constructor(private createThumbnailService: CreateThumbnailService) {}

  async handle(data: ICreateThumbnailRequest) {
    const { width, height, secure_url: url } = data;

    const thumbnail = await this.createThumbnailService.execute({ width, height, url });

    return thumbnail;
  }
}
