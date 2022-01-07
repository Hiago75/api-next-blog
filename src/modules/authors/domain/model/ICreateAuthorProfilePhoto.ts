import { IProfilePhoto } from "./ProfilePhotos/IProfilePhoto";

export interface ICreateAuthorProfilePhoto {
  user_id: string;
  photo: IProfilePhoto;
}
