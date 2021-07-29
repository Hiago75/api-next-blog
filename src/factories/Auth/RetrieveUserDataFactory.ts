import { RetrieveUserDataController } from '../../controllers/Auth/RetrieveUserDataController';
import { RetrieveUserDataService } from '../../services/Auth/RetrieveUserDataService';

export const RetrieveUserDataFactory = () => {
  const retrieveUserDataService = new RetrieveUserDataService();
  const retrieveUserDataController = new RetrieveUserDataController(retrieveUserDataService);

  return retrieveUserDataController;
};
