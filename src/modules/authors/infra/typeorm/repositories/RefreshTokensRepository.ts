import { IRefreshToken } from "@modules/authors/domain/model/Session/IRefreshToken";
import { IRefreshTokenRepository } from "@modules/authors/domain/repositories/IRefreshTokenRepository";
import { RefreshToken } from "@modules/authors/infra/typeorm/entities/RefreshToken";
import { getRepository, Repository } from "typeorm";

export class RefreshTokensRepository implements IRefreshTokenRepository {
  private ormRepository: Repository<IRefreshToken>

  constructor() {
    this.ormRepository = getRepository(RefreshToken);
  }

  async delete(refresh_token: string): Promise<void> {
    this.ormRepository.delete(refresh_token);
  }

  async findByToken(refresh_token: string): Promise<IRefreshToken | undefined> {
    return this.ormRepository.findOne({
      where: { id: refresh_token },
      relations: ['user']
    })
  }
}
