import { UpdateAuthorController } from '../../controllers';
import { UpdateAuthorService } from '../../services';

export function updateAuthorFactory() {
  const updateAuthorService = new UpdateAuthorService();
  const updateAuthorController = new UpdateAuthorController(updateAuthorService);

  return updateAuthorController;
}
