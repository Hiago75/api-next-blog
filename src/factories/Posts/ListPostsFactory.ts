import { ListPostsController } from '../../controllers';
import { ListPostsService } from '../../services';

export const ListPostsFactory = () => {
  const listPostsService = new ListPostsService();
  const listPostsController = new ListPostsController(listPostsService);

  return listPostsController;
};
