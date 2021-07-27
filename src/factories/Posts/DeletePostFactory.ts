import { DeletePostController } from '../../controllers';
import { DeletePostService } from '../../services';

export const DeletePostFactory = () => {
  const deletePostService = new DeletePostService();
  const deletePostController = new DeletePostController(deletePostService);

  return deletePostController;
};
