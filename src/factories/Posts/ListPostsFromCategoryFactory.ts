import { ListPostsFromCategoryController } from '../../controllers';
import { ListPostsFromCategoryService } from '../../services';

export const ListPostsFromCategoryFactory = () => {
  const listPostsFromCategoryService = new ListPostsFromCategoryService();
  const listPostsFromCategoryController = new ListPostsFromCategoryController(listPostsFromCategoryService);

  return listPostsFromCategoryController;
};
