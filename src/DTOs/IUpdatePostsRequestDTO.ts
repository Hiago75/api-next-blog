export interface IUpdatePostsRequestDTO {
  postId: string;
  itemsToBeUpdated: {
    title?: string;
    content?: string;
    categoryId?: string;
    coverId?: string;
    slug?: string;
  };
}
