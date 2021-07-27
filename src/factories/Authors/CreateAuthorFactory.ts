import { CreateAuthorController } from '../../controllers';
import { CreateAuthorService } from '../../services';

export const CreateAuthorFactory = () => {
  const createAuthorService = new CreateAuthorService();
  const createAuthorController = new CreateAuthorController(createAuthorService);

  return createAuthorController;
};
