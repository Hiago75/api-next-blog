import { CreateDateColumn, Entity, OneToOne, PrimaryColumn, UpdateDateColumn } from 'typeorm';
import { Covers } from './Covers';

@Entity('formats')
export class Formats {
  @PrimaryColumn()
  readonly id: string;

  @OneToOne((type) => Covers, (formats) => Formats)
  cover: Covers;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
