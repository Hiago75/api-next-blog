import { ShowPostController } from '../../controllers';
import { ShowPostService } from '../../services';

export const ShowPostFactory = () => {
  const showPostService = new ShowPostService();
  const showPostController = new ShowPostController(showPostService);

  return showPostController;
};
