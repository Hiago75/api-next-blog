import { EntityRepository, Repository } from 'typeorm';
import { RefreshToken } from '@modules/authors/infra/typeorm/entities/RefreshToken';

@EntityRepository(RefreshToken)
export class RefreshTokenRepositories extends Repository<RefreshToken> { }
