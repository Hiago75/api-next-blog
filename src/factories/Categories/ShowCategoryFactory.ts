import { ShowCategoryController } from '../../controllers';
import { ShowCategoryService } from '../../services';

export const ShowCategoryFactory = () => {
  const showCategoryService = new ShowCategoryService();
  const showCategoryController = new ShowCategoryController(showCategoryService);

  return showCategoryController;
};
