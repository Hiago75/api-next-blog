import { CreateCategoryService, ListCategoriesService } from '../../src/services';
import { testFactory } from '../utils/testFactory';

describe('List categories service', () => {
  const listCategoriesService = new ListCategoriesService();

  testFactory();

  const createCategoryMock = async (name: string) => {
    const createCategoryService = new CreateCategoryService();
    const category = await createCategoryService.execute({ name });

    return category;
  };

  it('should list all categories', async () => {
    await createCategoryMock('test');
    await createCategoryMock('another test');
    const listedCategories = await listCategoriesService.execute();

    expect(listedCategories.length).toEqual(2);
  });
});
