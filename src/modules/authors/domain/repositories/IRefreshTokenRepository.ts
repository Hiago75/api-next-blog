import { IRefreshToken } from "../model/Session/IRefreshToken";

export interface IRefreshTokenRepository {
  findByToken(refresh_token: string): Promise<IRefreshToken | undefined>;
  delete(refresh_token: string): Promise<void>;
}
