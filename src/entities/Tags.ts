import { Column, Entity, ManyToMany, PrimaryColumn } from 'typeorm';
import { v4 as uuid } from 'uuid';
import { Posts } from './Posts';

@Entity('tags')
export class Tags {
  @PrimaryColumn()
  readonly id: string;

  @Column()
  name: string;

  @ManyToMany((type) => Posts, (post) => post.tags, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  posts: Posts[];

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}
