import { CreateLargeService } from '../../../services/Formats/Sizes/CreateLargeService';

type ICreateLargeRequest = {
  transformation: string;
  width: number;
  height: number;
  bytes: number;
  format: string;
  url: string;
  secure_url: string;
};
export class CreateLargeController {
  constructor(private createLargeService: CreateLargeService) {}

  async handle(data: ICreateLargeRequest) {
    const { width, height, secure_url: url } = data;

    const large = await this.createLargeService.execute({ width, height, url });

    return large;
  }
}
