export interface ICreatePostsRequestDTO {
  title: string;
  content: string;
  slug: string;
  tagIds: string[];
  photoUrl: string;
  categoryId: string;
  authorId: string;
  coverId: string;
}
