import { CreateCategoryService, ShowCategoryService } from '../../src/services';
import { testFactory } from '../utils/testFactory';

describe('Show category service', () => {
  const createCategoryService = new CreateCategoryService();
  const showCategoryService = new ShowCategoryService();

  testFactory();

  it('should show the sent category', async () => {
    const name = 'Test';
    const category = await createCategoryService.execute({ name });
    const { id } = category;
    const showedCategory = await showCategoryService.execute({ id });

    expect(showedCategory).toHaveProperty('name', 'Test');
  });

  it('should not be able to show an invalid category', async () => {
    await expect(showCategoryService.execute({ id: 'invalid ID' })).rejects.toEqual(
      new Error('category_not_found_error'),
    );
  });
});
