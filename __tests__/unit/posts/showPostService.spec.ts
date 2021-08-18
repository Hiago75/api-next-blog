import { ShowPostService } from '../../../src/services';
import { postFactory, testSetup } from '../../utils';

describe('Show post service', () => {
  const sut = new ShowPostService();

  testSetup();

  it('should not be able to show a non-existent post', async () => {
    const post = sut.execute({ slug: 'invalid slug' });
    await expect(post).rejects.toEqual(new Error('post_not_found_error'));
  });

  it('should be able to shwo the sent post', async () => {
    const postSlug = (await postFactory()).slug;
    const post = await sut.execute({ slug: postSlug });

    expect(post).toHaveProperty('slug', postSlug);
  });
});
