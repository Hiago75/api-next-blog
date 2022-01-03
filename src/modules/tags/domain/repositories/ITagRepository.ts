import { ICreateTag } from "../model/ICreateTag";
import { IDeleteTag } from "../model/IDeleteTag";
import { ITag } from "../model/ITag";

export interface ITagRepository {
  findByName(name: string): Promise<ITag | undefined>;
  findById(id: string): Promise<ITag | undefined>
  getIdByName(tagName: string): Promise<string | undefined>;
  create({ name }: ICreateTag): Promise<ITag>;
  delete({ id }: IDeleteTag): Promise<void>;
  findAll(): Promise<ITag[]>;
}
