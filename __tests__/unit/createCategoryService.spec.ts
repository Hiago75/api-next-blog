import { CreateCategoryService } from '../../src/services';
import { testFactory } from '../utils/testFactory';
import { categoryFactory } from '../utils/factories/categoryFactory';

describe('Create category service', () => {
  const createCategoryService = new CreateCategoryService();

  testFactory();

  it('should not be able to create categories with the same name', async () => {
    const name = 'Test';
    await categoryFactory(name);
    await await expect(createCategoryService.execute({ name })).rejects.toEqual(
      new Error('category_creation_already_exists'),
    );
  });

  it('should create a new category', async () => {
    const name = 'Test';
    const category = await createCategoryService.execute({ name });

    expect(category).toHaveProperty('id');
  });
});
