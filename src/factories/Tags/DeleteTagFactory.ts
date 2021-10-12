import { DeleteTagController } from '../../controllers/Tags/DeleteTagController';
import { DeleteTagService } from '../../services/Tags/DeleteTagService';

export const DeleteTagFactory = () => {
  const deleteTagService = new DeleteTagService();
  const deleteTagController = new DeleteTagController(deleteTagService);

  return deleteTagController;
};
