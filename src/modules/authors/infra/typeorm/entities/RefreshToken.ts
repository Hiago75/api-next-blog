import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from 'typeorm';
import { v4 as uuid } from 'uuid';
import { Authors } from '@modules/authors/infra/typeorm/entities/Authors';
import { IAuthor } from '@modules/authors/domain/model/IAuthor';
import { IRefreshToken } from '@modules/authors/domain/model/Session/IRefreshToken';

@Entity('refresh_token')
export class RefreshToken implements IRefreshToken {
  @PrimaryColumn()
  readonly id: string;

  @Column()
  expiresOn: number;

  @OneToOne((type) => Authors, (refresh_token) => RefreshToken, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'user_id' })
  user: IAuthor;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}
