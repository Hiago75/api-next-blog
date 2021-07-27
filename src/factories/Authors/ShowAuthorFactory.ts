import { ShowAuthorController } from '../../controllers';
import { ShowAuthorService } from '../../services';

export const ShowAuthorFactory = () => {
  const showAuthorService = new ShowAuthorService();
  const showAuthorController = new ShowAuthorController(showAuthorService);

  return showAuthorController;
};
