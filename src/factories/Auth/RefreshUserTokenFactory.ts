import { RefreshUserTokenController } from '../../controllers';
import { RefreshUserTokenService } from '../../services';

export const RefreshUserTokenFactory = () => {
  const refreshUserTokenService = new RefreshUserTokenService();
  const refreshUserTokenController = new RefreshUserTokenController(refreshUserTokenService);

  return refreshUserTokenController;
};
