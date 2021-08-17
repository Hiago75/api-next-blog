import { ListCategoriesService } from '../../../src/services';
import { testSetup } from '../../utils/testSetup';
import { categoryFactory } from '../../utils/factories/categoryFactory';

describe('List categories service', () => {
  const listCategoriesService = new ListCategoriesService();

  testSetup();

  it('should list all categories', async () => {
    await categoryFactory('test');
    await categoryFactory('another test');
    const listedCategories = await listCategoriesService.execute();

    expect(listedCategories.length).toEqual(2);
  });
});
