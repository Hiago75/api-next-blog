import { ListPostsService } from '../../../src/services';
import { postFactory, testSetup } from '../../utils';

describe('List posts service', () => {
  const sut = new ListPostsService();

  testSetup();

  it('should be able to list all the posts', async () => {
    await postFactory();
    await postFactory();
    await postFactory();

    const postsList = await sut.execute({});

    expect(postsList.length).toBe(3);
  });

  it('should only be able to list 2 posts', async () => {
    await postFactory();
    await postFactory();
    await postFactory();

    const postsList = await sut.execute({ start: 0, limit: 2 });

    expect(postsList.length).toBe(2);
  });
});
