import { Entity, PrimaryColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { v4 as uuid } from 'uuid';
import { Posts } from './Posts';

@Entity('authors')
export class Authors {
  @PrimaryColumn()
  readonly id: string;

  @Column()
  name: string;

  @OneToMany((type) => Posts, (author) => Authors)
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
