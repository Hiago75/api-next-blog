import { IAuthor } from "@modules/authors/domain/model/IAuthor";
import { ITag } from "@modules/tags/domain/model/ITag";
import { Categories } from "src/entities/Categories";
import { Covers } from "src/entities/Covers";

export interface IPost {
  id: string;
  title: string;
  content: string;
  slug: string;
  externalPhotoUrl: string;
  categoryId: string;
  coverId: string;
  authorId: string;
  createdAt: Date;
  updatedAt: Date;
  cover: Covers
  category: Categories;
  tags: ITag[];
  author: IAuthor;
}
