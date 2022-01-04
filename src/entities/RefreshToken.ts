import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from 'typeorm';
import { v4 as uuid } from 'uuid';
import { Authors } from '@modules/authors/infra/typeorm/entities/Authors';

@Entity('refresh_token')
export class RefreshToken {
  @PrimaryColumn()
  readonly id: string;

  @Column()
  expiresOn: number;

  @OneToOne((type) => Authors, (refresh_token) => RefreshToken, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'user_id' })
  user: Authors;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}
