import { ListTagsService } from '../../services';
import { ListTagsController } from '../../controllers';

export const ListTagsFactory = () => {
  const listTagsService = new ListTagsService();
  const listTagsController = new ListTagsController(listTagsService);

  return listTagsController;
};
