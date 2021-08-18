import { CreatePostsService } from '../../../src/services';
import { authorFactory, categoryFactory, coversFactory, postFactory, testSetup } from '../../utils';

describe('Create post service', () => {
  const sut = new CreatePostsService();

  testSetup();

  const createPostData = async () => {
    const authorId = (await authorFactory()).id;
    const categoryId = (await categoryFactory('Python')).id;
    const coverId = (await coversFactory()).id;

    const postData = {
      title: 'Test title',
      content: 'Test content \n with another part of this test content',
      slug: 'test-title',
      authorId,
      categoryId,
      coverId,
    };

    return postData;
  };

  it('should be able to create a new post', async () => {
    const postData = await createPostData();
    const post = await sut.execute(postData);

    expect(post).toHaveProperty('id');
  });

  it('should not be able to create two posts with the same title', async () => {
    const postData = await createPostData();
    await postFactory(postData.title);

    await expect(sut.execute(postData)).rejects.toEqual(new Error('post_creation_title_in_use'));
  });
});
