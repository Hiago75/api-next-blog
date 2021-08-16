import { ShowCategoryService } from '../../../src/services';
import { testFactory } from '../../utils/testFactory';
import { categoryFactory } from '../../utils/factories/categoryFactory';

describe('Show category service', () => {
  const showCategoryService = new ShowCategoryService();

  testFactory();

  it('should show the sent category', async () => {
    const { id } = await categoryFactory('Test');
    const showedCategory = await showCategoryService.execute({ id });

    expect(showedCategory).toHaveProperty('name', 'Test');
  });

  it('should not be able to show a non-existent category', async () => {
    await expect(showCategoryService.execute({ id: 'invalid ID' })).rejects.toEqual(
      new Error('category_not_found_error'),
    );
  });
});
