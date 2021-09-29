import { UpdatePostsService } from '../../../src/services';
import { postFactory, testSetup, coversFactory, categoryFactory } from '../../utils';

describe('Update post service', () => {
  const sut = new UpdatePostsService();

  testSetup();

  const createPostData = async (newPost: boolean, newPostTitle?: string) => {
    const post = newPost ? await postFactory(newPostTitle) : undefined;
    const coverId = (await coversFactory()).id;
    const categoryId = (await categoryFactory('Python')).id;

    const postData = {
      title: 'Test title',
      content: 'Test content \n with another part of this test content',
      slug: 'Test-title',
      coverId: coverId,
      categoryId: categoryId,
    };

    return { post: post, postData };
  };

  it('should not be able to update a non-existant post', async () => {
    const { postData } = await createPostData(false);
    const post = sut.execute({ postId: 'invalidID', itemsToBeUpdated: postData });

    await expect(post).rejects.toEqual(new Error('post_not_found_error'));
  });

  it('should not be able to update a post if the sent title is already in use', async () => {
    const { post, postData } = await createPostData(true, 'Test title');
    const postResponse = sut.execute({ postId: post.id, itemsToBeUpdated: postData });

    await expect(postResponse).rejects.toEqual(new Error('post_creation_title_in_use'));
  });

  it('should be able to update only one field', async () => {
    const { post } = await createPostData(true);
    const itemsToBeUpdated = { title: 'random title' };
    const postResponse = sut.execute({ postId: post.id, itemsToBeUpdated });

    await expect(postResponse).resolves.toHaveProperty('title', 'random title');
  });

  it('should be able to update all fields', async () => {
    const { post, postData } = await createPostData(true);
    const postResponse = sut.execute({ postId: post.id, itemsToBeUpdated: postData });

    await expect(postResponse).resolves.toMatchObject(postData);
  });
});
