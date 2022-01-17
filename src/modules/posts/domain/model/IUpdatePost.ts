export interface IUpdatePost {
  postId: string;
  itemsToBeUpdated: {
    title?: string;
    content?: string;
    categoryId?: string;
    coverId?: string;
    slug?: string;
  };
}
