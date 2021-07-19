import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryColumn, UpdateDateColumn } from 'typeorm';
import { Covers } from './Covers';

@Entity('formats')
export class Formats {
  @PrimaryColumn()
  readonly id: string;

  @Column()
  name: string;

  @Column()
  width: number;

  @Column()
  height: number;

  @Column()
  url: string;

  @ManyToOne((type) => Covers, (formats) => Formats, { onDelete: 'CASCADE' })
  cover: Covers;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
