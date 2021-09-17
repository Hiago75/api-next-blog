import { CountPostsService } from '../../../src/services';
import { postFactory, testSetup } from '../../utils';

describe('List posts service', () => {
  const sut = new CountPostsService();

  testSetup();

  it('should be able to count the total of posts', async () => {
    await postFactory();
    await postFactory();
    await postFactory();

    const postList = await sut.execute();

    expect(postList.total).toBe(3);
  });

  it('should be able to count the total of user posts', async () => {
    const { author } = await postFactory();
    const postList = await sut.execute();

    expect(postList.authors).toEqual([{ name: author.name, posts: 1 }]);
  });
});
