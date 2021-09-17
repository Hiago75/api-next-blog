import { CountPostsController } from '../../controllers';
import { CountPostsService } from '../../services';

export const CountPostsFactory = () => {
  const countPostsService = new CountPostsService();
  const countPostsController = new CountPostsController(countPostsService);

  return countPostsController;
};
