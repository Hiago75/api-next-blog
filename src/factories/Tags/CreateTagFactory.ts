import { CreateTagController } from '../../controllers';
import { CreateTagService } from '../../services';

export const CreateTagFactory = () => {
  const createTagService = new CreateTagService();
  const createTagController = new CreateTagController(createTagService);

  return createTagController;
};
