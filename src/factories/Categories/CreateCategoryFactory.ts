import { CreateCategoryController } from '../../controllers';
import { CreateCategoryService } from '../../services';

export const CreateCategoryFactory = () => {
  const createCategoryService = new CreateCategoryService();
  const createCategoryController = new CreateCategoryController(createCategoryService);

  return createCategoryController;
};
