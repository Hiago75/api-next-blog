import { Column, CreateDateColumn, Entity, OneToMany, PrimaryColumn, UpdateDateColumn } from 'typeorm';
import { v4 as uuid } from 'uuid';
import { Formats } from './Formats';
import { Posts } from './Posts';

@Entity('covers')
export class Covers {
  @PrimaryColumn()
  readonly id: string;

  @Column()
  name: string;

  @Column({ name: 'public_id' })
  publicId: string;

  @Column()
  width: number;

  @Column()
  height: number;

  @Column()
  url: string;

  @Column()
  provider: string;

  @OneToMany((type) => Posts, (cover) => Covers)
  posts: Posts[];

  @OneToMany((type) => Formats, (cover) => Covers, { onDelete: 'CASCADE' })
  formats: Formats[];

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
