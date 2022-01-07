import { IAuthor } from "../IAuthor";

export interface IProfilePhoto {
  id: string;
  url: string;
  user: IAuthor;
  createdAt: Date;
  updatedAt: Date;
}
