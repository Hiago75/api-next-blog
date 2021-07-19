import { Column, CreateDateColumn, Entity, PrimaryColumn, UpdateDateColumn } from 'typeorm';

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

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
