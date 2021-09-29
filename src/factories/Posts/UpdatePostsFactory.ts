import { UpdatePostsController } from '../../controllers';
import { UpdatePostsService } from '../../services';

export const UpdatePostsFactory = () => {
  const updatePostsService = new UpdatePostsService();
  const updatePostsController = new UpdatePostsController(updatePostsService);

  return updatePostsController;
};
