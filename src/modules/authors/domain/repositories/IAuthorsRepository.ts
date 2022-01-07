import { IAuthor } from "../model/IAuthor";
import { ICreateAuthor } from "../model/ICreateAuthor";
import { ICreateAuthorProfilePhoto } from "../model/ICreateAuthorProfilePhoto";
import { IUpdateAuthor } from "../model/IUpdateAuthor";

export interface IAuthorsRepository {
  findById(id: string): Promise<IAuthor | undefined>;
  findAll(): Promise<IAuthor[]>;
  findIdByName(authorName: string): Promise<string | undefined>;
  findByEmail(email: string): Promise<IAuthor | undefined>;
  create({ name, email, password, admin }: ICreateAuthor): Promise<IAuthor>;
  update({ user_id, itemsSentToUpdate }: IUpdateAuthor): Promise<IAuthor>;
  createAuthorsProfilePhoto({ user_id, photo }: ICreateAuthorProfilePhoto): Promise<IAuthor>
}
