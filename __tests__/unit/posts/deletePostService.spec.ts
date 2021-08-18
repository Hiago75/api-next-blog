import { DeletePostService } from '../../../src/services';
import { postFactory, testSetup } from '../../utils';

describe('Delete post service', () => {
  const sut = new DeletePostService();

  testSetup();

  it('should not be able to delete a non-existent post', async () => {
    const deletePost = sut.execute({ postId: 'Invalid ID' });

    await expect(deletePost).rejects.toEqual(new Error('post_not_found_error'));
  });

  it('should be able to delete the sent post', async () => {
    const postToBeDeleted = (await postFactory()).id;

    const deletedPost = await sut.execute({ postId: postToBeDeleted });

    expect(deletedPost).toHaveProperty('deleted', true);
  });
});
