import { CreateSmallService } from '../../../../services/Covers/Formats/Sizes/CreateSmallService';

type ICreateSmallRequest = {
  transformation: string;
  width: number;
  height: number;
  bytes: number;
  format: string;
  url: string;
  secure_url: string;
};
export class CreateSmallController {
  constructor(private createSmallService: CreateSmallService) {}

  async handle(data: ICreateSmallRequest) {
    const { width, height, secure_url: url } = data;

    const small = await this.createSmallService.execute({ width, height, url });

    return small;
  }
}
