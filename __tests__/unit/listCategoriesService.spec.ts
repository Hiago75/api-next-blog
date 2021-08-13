import { ListCategoriesService } from '../../src/services';
import { testFactory } from '../utils/testFactory';
import { createCategoryMock } from '../utils/createCategory';

describe('List categories service', () => {
  const listCategoriesService = new ListCategoriesService();

  testFactory();

  it('should list all categories', async () => {
    await createCategoryMock('test');
    await createCategoryMock('another test');
    const listedCategories = await listCategoriesService.execute();

    expect(listedCategories.length).toEqual(2);
  });
});
