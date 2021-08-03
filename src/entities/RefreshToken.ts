import { Column, Entity, OneToOne, PrimaryColumn } from 'typeorm';
import { v4 as uuid } from 'uuid';
import { Authors } from './Authors';

@Entity('refresh_token')
export class RefreshToken {
  @PrimaryColumn()
  readonly id: string;

  @Column()
  expiresOn: Date;

  @OneToOne((type) => Authors, (refresh_token) => RefreshToken, {
    nullable: false,
    cascade: true,
  })
  userId: Authors;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}
