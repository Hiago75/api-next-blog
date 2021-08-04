import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from 'typeorm';
import { v4 as uuid } from 'uuid';
import { Authors } from './Authors';

@Entity('refresh_token')
export class RefreshToken {
  @PrimaryColumn()
  readonly id: string;

  @Column()
  expiresOn: number;

  @OneToOne((type) => Authors, (refresh_token) => RefreshToken, {
    nullable: false,
    cascade: true,
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'user_id' })
  user: Authors;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}
