import { AuthenticateUserService } from '@modules/authors/services/Session/AuthenticateUserService';
import { LogoutUserService } from '@modules/authors/services/Session/LogoutUserService';
import { Request, Response } from 'express';
import { RefreshUserTokenService } from '@modules/authors/services/Session/RefreshUserTokenService';
import { container } from 'tsyringe';
import { RetrieveUserDataService } from 'src/services';

class SessionsController {
  public async show(request: Request, response: Response): Promise<Response> {
    const { token } = request.body;
    const retrieveUserData = container.resolve(RetrieveUserDataService);

    const user = await retrieveUserData.execute(token);

    return response.json(user);

  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;
    const authenticateUser = container.resolve(AuthenticateUserService);

    const session = await authenticateUser.execute({ email, password })

    return response.json(session)
  }

  public async update(request: Request, response: Response): Promise<Response> {

    const { refreshToken } = request.params;
    const refreshUserToken = container.resolve(RefreshUserTokenService);

    const token = await refreshUserToken.execute(refreshToken);

    return response.json(token);

  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { refreshToken } = request.params;
    const deleteSession = container.resolve(LogoutUserService);

    await deleteSession.execute(refreshToken);

    return response.status(204).json();
  }
}

export default SessionsController
