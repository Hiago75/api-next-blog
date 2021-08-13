import { CreateCategoryService, DeleteCategoryService } from '../../src/services';
import { testFactory } from '../utils/testFactory';

describe('Delete category service', () => {
  const createCategoryService = new CreateCategoryService();
  const deleteCategoryService = new DeleteCategoryService();

  testFactory();

  it('should create a new category', async () => {
    const name = 'Test';
    const category = await createCategoryService.execute({ name });
    const { id: categoryId } = category;
    const deletedCategory = await deleteCategoryService.execute({ categoryId });

    expect(deletedCategory).toHaveProperty('deleted', true);
  });

  it('should not be able to delete a non-existent  category', async () => {
    await expect(deleteCategoryService.execute({ categoryId: 'invalid ID' })).rejects.toEqual(
      new Error('category_not_found_error'),
    );
  });
});
