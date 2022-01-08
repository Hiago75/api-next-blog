import { IAuthor } from "../IAuthor";

export interface IRefreshToken {
  id: string;
  expiresOn: number;
  user: IAuthor;
}
