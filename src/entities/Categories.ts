import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { v4 as uuid } from 'uuid';
import { Posts } from './Posts';

@Entity('categories')
export class Categories {
  @PrimaryColumn()
  readonly id: string;

  @Column()
  name: string;

  @OneToMany((type) => Posts, (post) => post.id, { onUpdate: 'CASCADE', onDelete: 'CASCADE' })
  posts: Posts[];

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}
