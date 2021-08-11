import { CreateCategoryService } from '../../src/services/Categories/CreateCategoryService';
import { testFactory } from '../utils/testFactory';

describe('Test my app server', () => {
  const createCategoryService = new CreateCategoryService();

  testFactory();

  it('should create a new category', async () => {
    const name = 'Test';
    const category = await createCategoryService.execute({ name });

    expect(category).toHaveProperty('id');
  });

  it('should not be able to create categories with the same name', async () => {
    const name = 'Test';
    await createCategoryService.execute({ name });

    await expect(createCategoryService.execute({ name })).rejects.toEqual(
      new Error('category_creation_already_exists'),
    );
  });
});
