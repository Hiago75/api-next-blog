import { CreatePostsController } from '../../controllers';
import { CreatePostsService } from '../../services';

export const CreatePostFactory = () => {
  const createPostsService = new CreatePostsService();
  const createPostsController = new CreatePostsController(createPostsService);

  return createPostsController;
};
