import { CreateMediumService } from '../../../services/Formats/Sizes/CreateMediumService';

type ICreateMediumRequest = {
  transformation: string;
  width: number;
  height: number;
  bytes: number;
  format: string;
  url: string;
  secure_url: string;
};
export class CreateMediumController {
  constructor(private createMediumService: CreateMediumService) {}

  async handle(data: ICreateMediumRequest) {
    const { width, height, secure_url: url } = data;

    const medium = await this.createMediumService.execute({ width, height, url });

    return medium;
  }
}
