import { Posts } from "../../../../entities/Posts";

export interface ITag {
  id: string;
  name: string;
  posts: Posts[];
}
