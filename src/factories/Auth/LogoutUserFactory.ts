import { LogoutUserController } from '../../controllers';
import { LogoutUserService } from '../../services';

export function LogoutUserFactory() {
  const logoutUserService = new LogoutUserService();
  const logoutUserController = new LogoutUserController(logoutUserService);

  return logoutUserController;
}
