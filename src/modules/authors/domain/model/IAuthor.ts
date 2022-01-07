import { Posts } from "src/entities/Posts";
import { RefreshToken } from "src/entities/RefreshToken";
import { IProfilePhoto } from "./ProfilePhotos/IProfilePhoto";

export interface IAuthor {
  id: string;
  name: string;
  email: string;
  profilePhoto: IProfilePhoto;
  password: string;
  admin: boolean;
  posts: Posts[];
  refreshToken: RefreshToken;
  createdAt: Date;
  updatedAt: Date;
}
