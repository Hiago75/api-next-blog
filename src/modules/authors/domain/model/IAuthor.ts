import { Posts } from "src/entities/Posts";
import { IProfilePhoto } from "./ProfilePhotos/IProfilePhoto";
import { IRefreshToken } from "./Session/IRefreshToken";

export interface IAuthor {
  id: string;
  name: string;
  email: string;
  profilePhoto: IProfilePhoto;
  password: string;
  admin: boolean;
  posts: Posts[];
  refreshToken: IRefreshToken;
  createdAt: Date;
  updatedAt: Date;
}
