import { AuthenticateUserController } from '../../controllers';
import { AuthenticateUserService } from '../../services';

export const AuthenticateUserFactory = () => {
  const authenticateUserService = new AuthenticateUserService();
  const authenticateUserController = new AuthenticateUserController(authenticateUserService);

  return authenticateUserController;
};
