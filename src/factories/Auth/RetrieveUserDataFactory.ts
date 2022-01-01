import { RetrieveUserDataController } from '../../controllers';
import { RetrieveUserDataService } from '../../services';

export const RetrieveUserDataFactory = () => {
  const retrieveUserDataService = new RetrieveUserDataService();
  const retrieveUserDataController = new RetrieveUserDataController(retrieveUserDataService);

  return retrieveUserDataController;
};
