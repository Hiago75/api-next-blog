import { Column, CreateDateColumn, Entity, OneToOne, PrimaryColumn, UpdateDateColumn } from 'typeorm';
import { v4 as uuid } from 'uuid';
import { Formats } from './Formats';

@Entity('large')
export class Large {
  @PrimaryColumn()
  readonly id: string;

  @Column()
  width: number;

  @Column()
  height: number;

  @Column()
  url: string;

  @OneToOne((type) => Formats, (large) => Large)
  formats: Formats;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}
