import { Column, CreateDateColumn, Entity, OneToMany, PrimaryColumn, UpdateDateColumn } from 'typeorm';
import { v4 as uuid } from 'uuid';
import { Posts } from './Posts';

@Entity('categories')
export class Categories {
  @PrimaryColumn()
  readonly id: string;

  @Column()
  name: string;

  @OneToMany((type) => Posts, (category) => Categories, { onDelete: 'CASCADE' })
  posts: Posts[];

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
