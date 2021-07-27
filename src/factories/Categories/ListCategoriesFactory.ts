import { ListCategoriesController } from '../../controllers';
import { ListCategoriesService } from '../../services';

export const ListCategoriesFactory = () => {
  const listCategoriesService = new ListCategoriesService();
  const listCategoriesController = new ListCategoriesController(listCategoriesService);

  return listCategoriesController;
};
