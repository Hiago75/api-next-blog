import { ListPostsFromCategoryService } from '../../../src/services';
import { categoryFactory, postFactory, testSetup } from '../../utils';

describe('List posts from category', () => {
  const sut = new ListPostsFromCategoryService();

  testSetup();

  it('should not be able to list anything if the sent category does not exists', async () => {
    await postFactory('Some title');

    const postList = sut.execute({ category: 'Non-existent' });

    await expect(postList).rejects.toEqual(new Error('category_not_found_error'));
  });

  it('should be able to list all the posts from the sent category', async () => {
    const category = await categoryFactory('NodeJS');
    await postFactory('Some title', category);
    await postFactory('another title', category);

    const postsList = await sut.execute({ category: 'NodeJS' });

    expect(postsList.length).toBe(2);
  });

  it('should be able to list and paginate the posts with the sent category', async () => {
    const category = await categoryFactory('NodeJS');
    await postFactory('Some title', category);
    await postFactory('another title', category);
    await postFactory('Title', category);

    const postsList = await sut.execute({ category: 'NodeJS', start: 0, limit: 2 });

    expect(postsList.length).toBe(2);
  });

  it('should be able to list only the posts from the sent category', async () => {
    const category = await categoryFactory('NodeJS');
    const category2 = await categoryFactory('Python');

    await postFactory('Some title', category);
    await postFactory('another title', category);
    await postFactory('Title', category2);

    const postsList = await sut.execute({ category: 'NodeJS' });

    expect(postsList.length).toBe(2);
  });
});
