import { ListAuthorsController } from '../../controllers';
import { ListAuthorsService } from '../../services';

export const ListAuthorFactory = () => {
  const listAuthorsService = new ListAuthorsService();
  const listAuthorsController = new ListAuthorsController(listAuthorsService);

  return listAuthorsController;
};
