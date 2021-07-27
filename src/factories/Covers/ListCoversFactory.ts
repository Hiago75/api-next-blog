import { ListCoversController } from '../../controllers';
import { ListCoversService } from '../../services';

export const ListCoversFactory = () => {
  const listCoversService = new ListCoversService();
  const listCoversController = new ListCoversController(listCoversService);

  return listCoversController;
};
