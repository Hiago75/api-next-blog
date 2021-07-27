import { DeleteCategoryController } from '../../controllers';
import { DeleteCategoryService } from '../../services';

export const DeleteCategoryFactory = () => {
  const deleteCategoryService = new DeleteCategoryService();
  const deleteCategoryController = new DeleteCategoryController(deleteCategoryService);

  return deleteCategoryController;
};
