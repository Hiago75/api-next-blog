import { IProfilePhoto } from "../model/ProfilePhotos/IProfilePhoto";

export interface IProfilePhotosRepository {
  create(url: string): Promise<IProfilePhoto>;
  updateUrl(profilePhoto: IProfilePhoto, newUrl: string): Promise<IProfilePhoto>;
}
