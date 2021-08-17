import { DeleteCategoryService } from '../../../src/services';
import { testSetup } from '../../utils/testSetup';
import { categoryFactory } from '../../utils/factories/categoryFactory';

describe('Delete category service', () => {
  const deleteCategoryService = new DeleteCategoryService();

  testSetup();

  it('should create delete the sent category category', async () => {
    const { id: categoryId } = await categoryFactory('Test');
    const deletedCategory = await deleteCategoryService.execute({ categoryId });

    expect(deletedCategory).toHaveProperty('deleted', true);
  });

  it('should not be able to delete a non-existent category', async () => {
    await expect(deleteCategoryService.execute({ categoryId: 'invalid ID' })).rejects.toEqual(
      new Error('category_not_found_error'),
    );
  });
});
