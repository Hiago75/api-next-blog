import { IListPosts } from "../model/IListsPosts";
import { IPost } from "../model/IPost";
import { IUpdatePost } from "../model/IUpdatePost";

export interface IQuery {
  [key: string]: string | string[] | IQuery;
}

export interface IPostsRepository {
  findBySlug(slug: string): Promise<IPost | undefined>
  findByTitle(title: string): Promise<IPost | undefined>
  findById(id: string): Promise<IPost | undefined>
  findAll({ start, limit, category, author }: IListPosts): Promise<IPost[] | undefined>
  count(query: IQuery): Promise<number>
  update({ postId, itemsToBeUpdated }: IUpdatePost): Promise<void>
}
