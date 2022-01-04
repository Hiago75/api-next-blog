import { Posts } from "src/entities/Posts";
import { ProfilePhotos } from "src/entities/ProfilePhotos";
import { RefreshToken } from "src/entities/RefreshToken";

export interface IAuthor {
  id: string;
  name: string;
  email: string;
  profilePhoto: ProfilePhotos;
  password: string;
  admin: boolean;
  posts: Posts[];
  refreshToken: RefreshToken;
  createdAt: Date;
  updatedAt: Date;
}
