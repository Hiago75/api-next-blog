import { CreateCategoryService } from '../../../src/services';

export const categoryFactory = async (name: string) => {
  const createCategoryService = new CreateCategoryService();
  const category = await createCategoryService.execute({ name });

  return category;
};
